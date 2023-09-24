import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const FormSchema = z.object({
  phone: z.string().length(8),
});

const AddPhone = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    return values;
  };
  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6">
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
};

export default AddPhone;
