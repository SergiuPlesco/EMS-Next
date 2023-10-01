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
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PositionsSchema = z.object({
  position: z.string(),
});

const newPositionSchema = z.object({
  newPosition: z.string(),
});

const AddPosition = () => {
  const { toast } = useToast();
  const {
    data: userPositions,
    refetch,
    isLoading: isUserPositionsLoading,
  } = trpc.users.getPositions.useQuery();
  const { data: positionsList, refetch: refetchPositionsList } =
    trpc.positions.all.useQuery();
  const updatePosition = trpc.users.updatePosition.useMutation();
  const createNewPosition = trpc.positions.createNewPosition.useMutation();
  const deletePosition = trpc.positions.deletePosition.useMutation();

  const [positions, setPositions] = useState<
    { id: number | string; title: string }[]
  >([]);
  const [showNewPositionForm, setShowNewPositionForm] = useState(false);

  const formPositions = useForm<z.infer<typeof PositionsSchema>>({
    resolver: zodResolver(PositionsSchema),
    defaultValues: {
      position: "",
    },
  });

  const formNewPositon = useForm<z.infer<typeof newPositionSchema>>({
    resolver: zodResolver(newPositionSchema),
    defaultValues: {
      newPosition: "",
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
        onSuccess: () => {
          refetch();
          formPositions.reset();
        },
      }
    );
  };

  const handleShowNewPositionForm = () => {
    setShowNewPositionForm((actual) => !actual);
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

  const onCreateNewPositon = (values: z.infer<typeof newPositionSchema>) => {
    createNewPosition.mutate(
      {
        title: values.newPosition,
      },
      {
        onSuccess: () => {
          formNewPositon.reset();
          refetchPositionsList();
          toast({
            description: "New positon added to the list",
            variant: "success",
          });
        },
      }
    );
  };

  const handleDeletePosition = (id: number) => () => {
    deletePosition.mutate(
      { positionId: id },
      {
        onSuccess: () => {
          refetchPositionsList();
          toast({
            description: "Position deleted form the list",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
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

        <Form {...formPositions}>
          <form
            onSubmit={formPositions.handleSubmit(() => {})}
            className="flex flex-col gap-2 w-full z-[3]"
          >
            <FormField
              control={formPositions.control}
              name="position"
              render={({ field: { value, onChange } }) => {
                return (
                  <FormItem>
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
                      <SelectContent className="w-full">
                        {positionsList &&
                          positionsList.map(
                            (position: { id: number; title: string }) => {
                              return (
                                <div
                                  key={position.id}
                                  className="flex justify-between items-center w-full"
                                >
                                  <SelectItem
                                    key={position.id}
                                    value={position.title}
                                    className="text-sm w-full"
                                  >
                                    {position.title}
                                  </SelectItem>
                                  <Button
                                    variant="link"
                                    onClick={handleDeletePosition(position.id)}
                                    className="focus:bg-accent focus:text-accent-foreground"
                                  >
                                    <AiOutlineDelete
                                      size={16}
                                      className="text-[#a12064]"
                                    />
                                  </Button>
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
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="py-0 h-7 rounded bg-smartgreen hover:bg-smartgreen/50"
                onClick={handleShowNewPositionForm}
              >
                +
              </Button>
            </div>
          </form>
        </Form>

        {showNewPositionForm && (
          <div className="w-full">
            <Form {...formNewPositon}>
              <form
                onSubmit={formNewPositon.handleSubmit(onCreateNewPositon)}
                className="flex flex-col gap-2 w-full"
              >
                <FormField
                  control={formNewPositon.control}
                  name="newPosition"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>New Position (correct name)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="New position"
                            type="text"
                            {...field}
                          />
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
                    Add
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default AddPosition;
