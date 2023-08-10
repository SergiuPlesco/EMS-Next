import { useSession } from "next-auth/react";
import React, { useEffect,useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

import { USER_POSITION } from "@/constants/common";
import { trpc } from "@/utils/trpc";

const UserPosition = () => {
  const { data: sesssion } = useSession();
  const addPosition = trpc.users.addPosition.useMutation();
  const deletePosition = trpc.users.deletePosition.useMutation();
  const user = trpc.users.getById.useQuery({
    userId: sesssion?.user.id as string,
  });

  const [positions, setPositions] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  const handelEditing = () => {
    setIsAdding(true);
  };
  const handleSaving = () => {
    setIsAdding(false);
    // addPosition.mutate({ positions: [...positions] });
  };

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setPositions([...positions, e.currentTarget.value]);
    setIsAdding(false);
    addPosition.mutate({ positions: [...positions, e.currentTarget.value] });
  };
  const handleDeletePosition = (position: string) => () => {
    setPositions(positions.filter((pos) => pos !== position));
    deletePosition.mutate({ position });
  };

  useEffect(() => {
    if (user && user.data) {
      setPositions([...user.data?.positions]);
    }
  }, [user.data?.positions]);

  return (
    <div className="flex flex-col items-start gap-4">
      {positions.length === 0 ? (
        <p className="text-slate-400 text-xs">Add your position</p>
      ) : (
        <div className="flex flex-col w-[250px]">
          {positions.map((position) => {
            return (
              <div key={position} className="flex justify-between mb-1">
                <p className="text-slate-500 pr-4 text-sm">{position}</p>
                <button onClick={handleDeletePosition(position)}>
                  <AiOutlineDelete size={16} className="text-[#a12064]" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {isAdding ? (
        <div className="flex items-center justify-between w-[250px]">
          <select
            name="position"
            id="position-select"
            onChange={handleChange}
            className="p-1 text-sm text-slate-600 rounded bg-transparent border appearance-none"
          >
            <option value="" className="text-slate-400">
              Please choose an option
            </option>
            {USER_POSITION.map((position) => {
              return (
                <option
                  key={position.value}
                  value={position.value}
                  className="text-sm"
                >
                  {position.label}
                </option>
              );
            })}
          </select>
          {positions.length > 0 ? (
            <button onClick={handleSaving}>
              <AiOutlineCheck size={16} className="text-[#662d91]" />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex items-center justify-end w-[250px]">
          <button onClick={handelEditing}>
            <AiOutlinePlus size={16} className="text-[#8dc63f]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPosition;
