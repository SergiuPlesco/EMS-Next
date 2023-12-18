import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
  phone: string | null;
  role: string | null;
  employmentDate: Date | null;
  availability: "FULLTIME" | "PARTTIME" | "NOTAVAILABLE";
};

const FormSchema = z.object({
  phone: z.string().length(9),
  employmentDate: z.date().nullable(),
  availability: z.enum(["FULLTIME", "PARTTIME", "NOTAVAILABLE"]),
});

const UserInfoForm = ({ user }: { user: User }) => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    values: {
      phone: user?.phone || "",
      employmentDate: user?.employmentDate,
      availability: user?.availability,
    },
    mode: "all",
  });

  const updateInfo = trpc.users.userInfo.useMutation();
  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    updateInfo.mutate(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast({
            description: "Personal information has been updated.",
            variant: "success",
          });
          utils.users.getLoggedUser.invalidate();
        },
        onError: () => {
          toast({
            description: "An error occured, try again",
            variant: "destructive",
          });
        },
      }
    );
  };
  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="w-full [&_.react-datepicker-wrapper]:w-full [&_span::before]:top-[13px]">
              <FormField
                control={form.control}
                name="employmentDate"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-0">
                      <FormLabel>Employment Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          showMonthYearPicker
                          showFullMonthYearPicker
                          dateFormat="MMMM, yyyy"
                          popperPlacement="bottom"
                          className="w-full mt-2"
                          maxDate={new Date()}
                          customInput={
                            <Button
                              type="button"
                              variant={"outline"}
                              className={cn(
                                "justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "MMMM, yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="availability"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-2">
                      <FormLabel>Availability</FormLabel>

                      <Select
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="FULLTIME">Full Time</SelectItem>
                          <SelectItem value="PARTTIME">Part Time</SelectItem>
                          <SelectItem value="NOTAVAILABLE">
                            Not Available
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </div>
          <div>
            <Button
              type="submit"
              className="py-0 h-7 rounded bg-blue-300 bg-smartpurple"
              disabled={updateInfo.isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoForm;
