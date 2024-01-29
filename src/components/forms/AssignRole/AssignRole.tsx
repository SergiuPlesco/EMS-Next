import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { USER_ROLES } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";
import { trpc } from "@/utils/trpc";

const FormSchema = z.object({
  role: z.string(),
});

const AssignRole = ({ user }: { user: TUser }) => {
  const { toast } = useToast();
  const roleValues = Object.values(USER_ROLES);
  const utils = trpc.useUtils();
  const assignRole = trpc.admin.assignRole.useMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      role: user.role || USER_ROLES.USER,
    },
  });

  const handleRoleAssignment = (data: z.infer<typeof FormSchema>) => {
    if (!data) return;
    assignRole.mutate(
      {
        userId: user.id,
        role: data.role,
      },
      {
        onSuccess: () => {
          toast({
            description: (
              <p>
                <span className="capitalize">&quot;{`${data.role}`}&quot;</span>{" "}
                role has been assigned to {`${user.name}.`}
              </p>
            ),
            variant: "success",
          });
          utils.users.getById.invalidate();
        },
        onError: () => {
          toast({
            description: "Something went wrong.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    handleRoleAssignment(data);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="capitalize">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleValues.map((role) => {
                          return (
                            <SelectItem
                              key={role}
                              value={role}
                              className="capitalize"
                            >
                              {role}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                );
              }}
            />

            <div className="flex justify-end gap-2 mb-4">
              <Button
                type="submit"
                className="mt-2 py-0 h-7 rounded bg-blue-300 bg-smartpurple"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AssignRole;
