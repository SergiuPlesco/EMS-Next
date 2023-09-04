import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";

import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

const Position = () => {
  const { data: userPositions, refetch } = trpc.users.getPositions.useQuery();
  const { data: positionsList } = trpc.positions.all.useQuery();
  const addPosition = trpc.users.addPosition.useMutation();
  const deletePosition = trpc.users.deletePosition.useMutation();

  const [isEditing, setIsEditing] = useState(false);

  const handelEditing = () => {
    setIsEditing(true);
  };

  const handleSaving = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const positionAdded = userPositions?.find(
      (position) => position.title === e.currentTarget.value
    );

    if (e.currentTarget.value === "") return;
    if (positionAdded) return;

    addPosition.mutate(
      { positions: [e.currentTarget.value] },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const handleDeletePosition = (positionId: number) => () => {
    deletePosition.mutate(
      { positionId },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  if (userPositions == null) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-4">
      {userPositions.length === 0 && !isEditing && (
        <div className="flex items-center justify-end gap-2 w-full max-w-[300px]">
          <button
            className="flex items-center justify-end gap-2"
            onClick={handelEditing}
          >
            <p className="text-slate-400 text-xs">Add position</p>
            <AiOutlinePlus size={16} className="text-[#8dc63f]" />
          </button>
        </div>
      )}

      <div className="flex flex-col w-full max-w-[300px]">
        <div className="flex justify-between">
          <div className="w-full">
            {userPositions.map((position) => {
              return (
                <div key={generateId()} className="flex justify-between mb-1">
                  <p className="text-slate-500 pr-4 text-sm">
                    {position.title}
                  </p>
                  {isEditing ? (
                    <button onClick={handleDeletePosition(position.id)}>
                      <AiOutlineDelete size={16} className="text-[#a12064]" />
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
          {userPositions.length > 0 && !isEditing && (
            <div>
              <button onClick={handelEditing}>
                <MdModeEdit size={16} className="text-slate-600" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="flex items-center justify-between w-full max-w-[300px]">
          <select
            name="position"
            id="position-select"
            defaultValue="Add a position"
            onChange={handleChange}
            className="p-1 text-sm text-slate-600 rounded bg-transparent border  w-[250px]"
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

          <button onClick={handleSaving}>
            <AiOutlineCheck size={16} className="text-[#662d91]" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Position;
