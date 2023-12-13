import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddPosition from "@/components/forms/AddPosition/AddPosition";
import { trpc } from "@/utils/trpc";

import Modal from "../Modal/Modal";

const Positions = () => {
  const { data: userPositions, isLoading } = trpc.users.getPositions.useQuery();

  if (isLoading || !userPositions) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        <Modal
          title="Edit positions"
          description="Search or create"
          icon={<PlusIcon width={16} color="var(--smart-purple)" />}
          text={
            <p className="text-[10px] font-normal text-slate-500">
              Add/Remove Positions
            </p>
          }
        >
          <AddPosition />
        </Modal>
      </div>
      {userPositions?.length > 0 &&
        userPositions.map((position) => {
          return (
            <h3 key={position.id} className="font-semibold text-slate-600">
              {position.name}
            </h3>
          );
        })}
    </div>
  );
};

export default Positions;
