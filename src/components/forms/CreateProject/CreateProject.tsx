import "react-datepicker/dist/react-datepicker.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";
import React from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

const FormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Project name is required")
      .max(
        50,
        "Project name cannot be longer than 50 characters. Please shorten the project name and try again."
      ),
    startDate: z.date(),
    endDate: z.date().nullable(),
    isPresent: z.boolean(),
    description: z
      .string()
      .max(
        350,
        "Project description cannot be longer than 350 characters. Please shorten the project description and try again."
      ),
  })
  .refine(
    (data) => {
      const { startDate, endDate, isPresent } = data;

      if (isPresent) {
        return startDate != null && endDate == null;
      }
      if (!isPresent && startDate && endDate) {
        return startDate <= endDate;
      }
    },
    {
      message: "Invalid date range. Please check the start and end dates.",
      path: ["endDate"],
    }
  );

export default function CreateProject() {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const createProject = trpc.projects.create.useMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: searchList } = trpc.projects.search.useQuery({
    searchQuery,
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      isPresent: false,
      description: "",
    },
    mode: "all",
  });

  const handleCreateNewProject = (data: z.infer<typeof FormSchema>) => {
    if (!data) return;
    createProject.mutate(
      {
        name: String(data.name).trim(),
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
      },
      {
        onSuccess: () => {
          toast({
            description: `${data.name} has been added.`,
            variant: "success",
          });
          utils.projects.getAll.invalidate();
          utils.users.getLoggedUser.invalidate();
          form.reset();
        },
        onError: (error) => {
          toast({
            description: `${error.message}`,
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleSelect = (name: string) => {
    form.setValue("name", name);
    setSearchQuery("");
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleCreateNewProject(data);
  }
  const isPresent = form.getValues().isPresent;

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
                    <div className="my-2 flex items-center">
                      <Checkbox
                        className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                        checked={field.value}
                        onCheckedChange={(isChecked) => {
                          field.onChange(isChecked);
                          if (isChecked) {
                            form.setValue("endDate", null);
                          } else {
                            form.setValue("endDate", new Date());
                          }
                        }}
                      />

                      <FormLabel className="ml-2 text-base">
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
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onChange={field.onChange}
                          showMonthYearPicker
                          dateFormat="MMMM, yyyy"
                          popperPlacement="bottom"
                          className="w-full mt-2"
                          customInput={
                            <Button
                              type="button"
                              variant={"outline"}
                              className={cn(
                                "justify-start text-left font-normal text-base",
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
                          disabled={isPresent}
                          selected={field.value}
                          onChange={field.onChange}
                          showMonthYearPicker
                          popperClassName="absolute top-0"
                          popperPlacement="bottom"
                          dateFormat="MMMM, yyyy"
                          className="w-full mt-2"
                          customInput={
                            <Button
                              type="button"
                              variant={"outline"}
                              className={cn(
                                "justify-start text-left font-normal text-base",
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
                    <Autocomplete
                      value={field.value}
                      //
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        field.onChange(e);
                      }}
                      options={searchList}
                      // form setValue
                      onSelect={handleSelect}
                    />
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
                    <Textarea
                      className="placeholder:text-slate-400 text-base"
                      placeholder="Start writing about your role in this project and more..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
  );
}
