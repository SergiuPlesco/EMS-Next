import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

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

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const positionAdded = positions?.find(
      (position) => position.title === e.currentTarget.value
    );

    if (e.currentTarget.value === "" || positionAdded) {
      return; // Exit early if the value is empty or the position is already added
    }

    setPositions([
      ...positions,
      { id: generateId(), title: e.currentTarget.value },
    ]);
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

        <div className="flex items-center justify-between w-full w-full">
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
                  <option
                    key={position.id}
                    value={position.title}
                    className="text-sm"
                  >
                    {position.title}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="border rounded px-2 pt-1 pb-2 flex items-center leading-4 text-[16px]"
            onClick={handleSave}
          >
            save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPosition;
