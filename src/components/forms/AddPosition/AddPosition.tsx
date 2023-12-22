import { UserPosition } from "@prisma/client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

const AddPosition = ({ userPositions }: { userPositions: UserPosition[] }) => {
  const { toast } = useToast();
  const utils = trpc.useContext();
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

  const handleDeleteFromUser = (userPositionId: number, name: string) => () => {
    deletePositionFromUser.mutate(
      {
        userPositionId,
      },
      {
        onSuccess: () => {
          toast({
            description: `${name} deleted`,
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
      }
    );
  };

  const handleOnSelect = (name: string) => {
    const positionAdded = userPositions?.find(
      (position) => position.name === name
    );

    if (name === "" || positionAdded) {
      toast({
        description: `${name} is already in your list`,
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
            description: `${name} added to your positions`,
            variant: "success",
          });
          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };

  const handleCreateNewPosition = () => {
    if (!inputValue) {
      toast({
        description: "What are you adding?",
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
            description: `${inputValue} added to the list`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };

  if (userPositions == null) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col gap-2 border rounded p-2 mb-6 shadow-md">
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 flex-wrap">
              {userPositions
                ? userPositions.map((position) => {
                    return (
                      <div
                        key={generateId()}
                        className="flex justify-start gap-3 w-fit p-2 rounded bg-slate-200"
                      >
                        <p className="text-slate-500 pr-4 text-sm">
                          {position.name}
                        </p>
                        <button
                          onClick={handleDeleteFromUser(
                            position.id,
                            position.name
                          )}
                        >
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
        <Autocomplete
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
