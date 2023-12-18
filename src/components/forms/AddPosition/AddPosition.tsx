import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

const AddPosition = () => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const [inputValue, setInputValue] = useState("");

  const [positions, setPositions] = useState<{ id: number; name: string }[]>(
    []
  );

  const { data: userPositions, isLoading: isUserPositionsLoading } =
    trpc.users.getPositions.useQuery();

  const { data: searchList } = trpc.positions.search.useQuery({
    searchQuery: inputValue,
  });

  const addPositionToUser = trpc.users.addPosition.useMutation();
  const deletePositionFromUser = trpc.users.deletePosition.useMutation();
  const createNewPosition = trpc.positions.create.useMutation();
  const deletePosition = trpc.positions.delete.useMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleDeleteFromUser = (id: number, name: string) => () => {
    const elementToDeleteIndex = positions.findIndex(
      (position) => position.id === id
    );
    if (elementToDeleteIndex !== -1) {
      const newPositions = [...positions];
      newPositions.splice(elementToDeleteIndex, 1);
      setPositions(newPositions);
    }
    deletePositionFromUser.mutate(
      {
        positionId: id,
      },
      {
        onSuccess: () => {
          toast({
            description: `${name} deleted`,
            variant: "success",
          });
          utils.users.getPositions.invalidate();
        },
      }
    );
  };

  const handleOnSelect = (name: string) => {
    const positionAdded = positions?.find((position) => position.name === name);

    if (name === "" || positionAdded) {
      toast({
        description: `${name} is already in your list`,
        variant: "destructive",
      });
      return;
    }

    setPositions([
      ...positions,
      {
        id: Number(generateId()),
        name,
      },
    ]);
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
          utils.users.getPositions.invalidate();
        },
        onError: () => {},
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
          utils.users.getPositions.invalidate();
        },
      }
    );
  };

  const handleDeletePositionFromList = (id: number, name: string) => () => {
    deletePosition.mutate(
      { positionId: id, name },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} deleted form the list`,
            variant: "success",
          });
          utils.positions.search.invalidate();
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

  useEffect(() => {
    !isUserPositionsLoading &&
      userPositions &&
      setPositions(
        userPositions.map((position) => ({
          id: position.id,
          name: position.name,
        }))
      );
  }, [isUserPositionsLoading, userPositions]);

  if (userPositions == null) {
    return null;
  }

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
          onDelete={handleDeletePositionFromList}
          onEnter={handleCreateNewPosition}
        />

        <div className="flex gap-2 mb-4">
          <Button
            type="submit"
            className="py-0 h-7 rounded bg-blue-300 bg-smartgreen"
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
