import "react-datepicker/dist/react-datepicker.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const FormSchema = z
  .object({
    name: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    isPresent: z.boolean().optional(),
    description: z.string(),
  })
  .refine((schema) => schema.startDate <= schema.endDate, {
    message: "Start Date must be before End Date.",
    path: ["endDate"],
  });

export default function CreateProject() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      description: "",
    },
    mode: "all",
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    return data;
  }

  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 w-full"
        >
          <FormField
            control={form.control}
            name="isPresent"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="my-2 ">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />

                      <FormLabel className="ml-2">
                        I am currently assigned to this project
                      </FormLabel>
                    </div>
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
                name="startDate"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-0">
                      <FormLabel className="">Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          showMonthYearPicker
                          showFullMonthYearPicker
                          dateFormat="MMMM, yyyy"
                          popperPlacement="bottom"
                          className="w-full mt-2"
                          customInput={
                            <Button
                              id="date"
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
            <div className="w-full [&_.react-datepicker-wrapper]:w-full [&_span::before]:top-[13px]">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => {
                  return (
                    <FormItem className="space-y-0">
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          showMonthYearPicker
                          showFullMonthYearPicker
                          popperPlacement="bottom"
                          dateFormat="MMMM, yyyy"
                          className="w-full mt-2 [&_.react-datepicker__navigation-icon]:p-[50px]"
                          customInput={
                            <Button
                              id="date"
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
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project name" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div>
            <Button
              type="submit"
              className="py-0 h-7 rounded bg-blue-300 bg-smartpurple"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
