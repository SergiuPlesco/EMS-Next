import { UserPosition } from "@prisma/client";
import React, { useState } from "react";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import TagList from "@/components/TagList/TagList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

const AddPosition = ({ userPositions }: { userPositions: UserPosition[] }) => {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [inputValue, setInputValue] = useState("");

  const { data: searchList } = trpc.positions.search.useQuery({
    searchQuery: inputValue,
  });

  const addPositionToUser = trpc.users.addPosition.useMutation();
  const deletePositionFromUser = trpc.users.deletePosition.useMutation();
  const createNewPosition = trpc.positions.create.useMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleDeleteFromUser =
    (userPositionId: number | string, name: string) => () => {
      deletePositionFromUser.mutate(
        {
          userPositionId: Number(userPositionId),
        },
        {
          onSuccess: () => {
            toast({
              description: `${name} deleted.`,
              variant: "success",
            });

            utils.users.getLoggedUser.invalidate();
          },
          onError: (error) => {
            toast({
              description: `${error.message} `,
              variant: "destructive",
            });
          },
        },
      );
    };

  const handleOnSelect = (name: string) => {
    const positionAdded = userPositions?.find(
      (position) => position.name === name,
    );

    if (name === "" || positionAdded) {
      toast({
        description: `${name} is already in your list.`,
        variant: "destructive",
      });
      return;
    }

    addPositionToUser.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} added to your positions.`,
            variant: "success",
          });
          utils.users.getLoggedUser.invalidate();
        },
      },
    );
  };

  const handleCreateNewPosition = () => {
    if (!inputValue) {
      toast({
        description:
          "Please enter a position name in the input field before saving.",
        variant: "destructive",
      });
      return;
    }
    createNewPosition.mutate(
      {
        name: inputValue,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${inputValue} added to the list.`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
        },
        onError: (error) => {
          toast({
            description:
              error?.data?.zodError?.fieldErrors &&
              error?.data?.zodError?.fieldErrors.name
                ? error.data?.zodError?.fieldErrors.name[0]
                : "Something went wrong.",
            variant: "destructive",
          });
        },
      },
    );
  };

  if (userPositions == null) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2 border rounded p-2 mb-6 shadow-md">
        <TagList options={userPositions} onDelete={handleDeleteFromUser} />
        <Autocomplete
          placeholder="Search, select, or create a tag on Enter or Add button."
          value={inputValue}
          onChange={handleOnChange}
          options={searchList}
          onSelect={handleOnSelect}
          onEnter={handleCreateNewPosition}
        />

        <div className="flex justify-end gap-2 mb-4">
          <Button
            type="submit"
            className="mt-2 py-0 h-7 rounded bg-blue-300 bg-smartpurple"
            onClick={handleCreateNewPosition}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddPosition;
