import { zodResolver } from "@hookform/resolvers/zod";
import { UserSkill } from "@prisma/client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";
const FormSchema = z.object({
  rating: z.array(z.number()).refine((value) => value[0] >= 5, {
    message: "Knowledge level cannot be less than 5.",
  }),
});

const EditRating = ({
  skill,
  onSave,
}: {
  skill: UserSkill;
  onSave?: () => void;
}) => {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rating: [skill.rating],
    },
  });

  const { toast } = useToast();
  const utils = trpc.useUtils();

  const updateSkillRating = trpc.users.updateRating.useMutation();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const rating = data.rating[0];
    updateSkillRating.mutate(
      {
        skillId: skill.id,
        rating: rating,
      },
      {
        onSuccess: () => {
          toast({
            description: `${skill.name} rating has been updated.`,
            variant: "success",
          });
          onSave && onSave();
          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };
  const rangeValue = form.getValues("rating");
  form.watch("rating");
  return (
    <>
      <div className="flex justify-between mb-2">
        <p className="font-medium text-slate-700">{skill.name}</p>
        <p className="font-medium text-slate-700">{rangeValue}%</p>
      </div>
      <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full"
          >
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => {
                return (
                  <FormItem className="space-y-4">
                    <FormLabel>Knowledge level in percentages</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={5}
                        value={field.value}
                        onValueChange={field.onChange}
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
    </>
  );
};

export default EditRating;
