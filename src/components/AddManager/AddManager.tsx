import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";

const ManagerSchema = z.object({
  managerId: z.string(),
});

const AddManager = () => {
  const { data: userList } = trpc.users.all.useQuery();
  const addManager = trpc.users.addManager.useMutation();

  const { toast } = useToast();

  const formPositions = useForm<z.infer<typeof ManagerSchema>>({
    resolver: zodResolver(ManagerSchema),
    defaultValues: {
      managerId: "",
    },
  });

  const handleAddManager = (values: z.infer<typeof ManagerSchema>) => {
    addManager.mutate(
      {
        managerId: values.managerId,
      },
      {
        onSuccess: () => {
          toast({
            description: "Manager added",
            variant: "success",
          });
        },
        onError: () => {
          toast({
            description: "Error occured when adding a manager",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (!userList) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <Form {...formPositions}>
        <form
          onSubmit={formPositions.handleSubmit(handleAddManager)}
          className="flex flex-col gap-2 w-full z-[3]"
        >
          <FormField
            control={formPositions.control}
            name="managerId"
            render={({ field: { value, onChange } }) => {
              return (
                <FormItem>
                  <FormLabel>Managers</FormLabel>
                  <Select
                    defaultValue={value}
                    onValueChange={(e) => {
                      onChange(e);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Add a manager" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {userList &&
                        userList.map(
                          (user: { id: string; name: string | null }) => {
                            return (
                              <div
                                key={user.id}
                                className="flex justify-between items-center w-full"
                              >
                                <SelectItem
                                  key={user.id}
                                  value={user.id}
                                  className="text-sm w-full"
                                >
                                  {user.name}
                                </SelectItem>
                              </div>
                            );
                          }
                        )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-between">
            <Button
              type="submit"
              className="py-0 h-7 rounded bg-smartpurple hover:bg-smartpurple/90"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddManager;
