import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import { trpc } from "@/utils/trpc";

import AddPosition from "../AddPosition/AddPosition";
import Modal from "../Modal/Modal";

const Positions = () => {
  const { data: userPositions, isLoading } = trpc.users.getPositions.useQuery();

  if (isLoading || !userPositions) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        <p className="text-slate-500 text-sm">Positions</p>
        <Modal
          title="Edit positions"
          description="Search or create"
          icon={<PlusIcon width={16} color="var(--smart-purple)" />}
        >
          <AddPosition />
        </Modal>
      </div>
      {userPositions?.length > 0 ? (
        userPositions.map((position) => {
          return (
            <h3 key={position.id} className="font-semibold text-slate-600">
              {position.name}
            </h3>
          );
        })
      ) : (
        <p className="text-sm text-slate-400">Add position</p>
      )}
    </div>
  );
};

export default Positions;
