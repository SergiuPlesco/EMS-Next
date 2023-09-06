import React, { useState } from "react";
// import { AiOutlinePlus } from "react-icons/ai";
// import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

// import { MdModeEdit } from "react-icons/md";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

const Position = () => {
  const { data: userPositions, refetch } = trpc.users.getPositions.useQuery();
  const { data: positionsList } = trpc.positions.all.useQuery();
  const addPosition = trpc.users.addPosition.useMutation();
  const deletePosition = trpc.users.deletePosition.useMutation();

  const [positions, setPositions] = useState<string[]>([]);

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const positionAdded = positions?.find(
      (position) => position === e.currentTarget.value
    );

    if (e.currentTarget.value === "") return;
    if (positionAdded) return;
    setPositions([...positions, e.currentTarget.value]);
  };

  const handleDeletePosition = (positionId: number) => () => {
    deletePosition.mutate(
      { positionId },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  const handleSave = () => {
    addPosition.mutate(
      { positions: [...positions] },
      {
        onSuccess: () => refetch(),
      }
    );
  };

  if (userPositions == null) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6">
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <div className="flex gap-1 flex-wrap">
              {userPositions.map((position) => {
                return (
                  <div
                    key={generateId()}
                    className="flex justify-start w-fit mb-1 py-1 px-1 rounded bg-slate-300"
                  >
                    <p className="text-slate-500 pr-4 text-sm">
                      {position.title}
                    </p>
                    <button onClick={handleDeletePosition(position.id)}>
                      <AiOutlineDelete size={16} className="text-[#a12064]" />
                    </button>
                  </div>
                );
              })}
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
    </>
  );
};

export default Position;
