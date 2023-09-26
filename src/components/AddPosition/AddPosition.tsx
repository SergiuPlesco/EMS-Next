import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
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
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";

const FormSchema = z.object({
  position: z.string(),
});

const AddPosition = () => {
  const {
    data: userPositions,
    refetch,
    isLoading: isUserPositionsLoading,
  } = trpc.users.getPositions.useQuery();
  const { data: positionsList } = trpc.positions.all.useQuery();
  const updatePosition = trpc.users.updatePosition.useMutation();

  const [positions, setPositions] = useState<
    { id: number | string; title: string }[]
  >([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      position: "",
    },
  });

  const handleChange = (value: string) => {
    const positionAdded = positions?.find(
      (position) => position.title === value
    );

    if (value === "" || positionAdded) {
      return; // Exit early if the value is empty or the position is already added
    }

    setPositions([...positions, { id: generateId(), title: value }]);
  };

  const handleDelete = (id: number | string) => () => {
    const elementToDeleteIndex = positions.findIndex(
      (position) => position.id === id
    );
    if (elementToDeleteIndex !== -1) {
      const newPositions = [...positions];
      newPositions.splice(elementToDeleteIndex, 1);
      setPositions(newPositions);
    }
  };

  const handleSave = () => {
    updatePosition.mutate(
      { positions: positions?.map((position) => position.title) || [] },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  useEffect(() => {
    !isUserPositionsLoading &&
      userPositions &&
      setPositions(
        userPositions.map((position) => ({
          id: generateId(),
          title: position.title,
        }))
      );
  }, [isUserPositionsLoading, userPositions]);

  if (userPositions == null) {
    return null;
  }

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    return values;
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 flex-wrap">
              {positions
                ? positions.map((position) => {
                    return (
                      <div
                        key={generateId()}
                        className="flex justify-start w-fit mb-1 py-1 px-1 rounded bg-slate-200"
                      >
                        <p className="text-slate-500 pr-4 text-sm">
                          {position.title}
                        </p>
                        <button onClick={handleDelete(position.id)}>
                          <AiOutlineDelete
                            size={16}
                            className="text-[#a12064]"
                          />
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2 w-full z-[3]"
          >
            <FormField
              control={form.control}
              name="position"
              render={({ field: { value, onChange } }) => {
                return (
                  <FormItem className="z-[4] relative">
                    <FormLabel>Positions</FormLabel>
                    <Select
                      defaultValue={value}
                      onValueChange={(e) => (onChange(e), handleChange(e))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positionsList &&
                          positionsList.map(
                            (position: { id: number; title: string }) => {
                              return (
                                <SelectItem
                                  key={position.id}
                                  value={position.title}
                                  className="text-sm"
                                >
                                  {position.title}
                                </SelectItem>
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
            <div>
              <Button
                type="submit"
                className="py-0 h-7 rounded bg-blue-300 bg-smartpurple"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>

        {/* <div className="flex items-center justify-between w-full w-full">
					<select
						name="position"
						id="position-select"
						defaultValue=""
						onChange={handleChange}
						className="p-1 text-sm text-slate-600 rounded bg-transparent border  w-full"
					>
						<option value="" className="text-sm text-slate-400">
							Add a position
						</option>
						{positionsList &&
							positionsList.map((position: { id: number; title: string }) => {
								return (
									<option key={position.id} value={position.title} className="text-sm">
										{position.title}
									</option>
								);
							})}
					</select>
				</div> */}
        {/* <div className="flex justify-end">
					<Button
						type="submit"
						className="py-0 h-7 rounded bg-blue-300 bg-smartpurple"
						onClick={handleSave}
					>
						Save
					</Button>
				</div> */}
      </div>
    </>
  );
};

export default AddPosition;
