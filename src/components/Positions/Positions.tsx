import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddPosition from "@/components/forms/AddPosition/AddPosition";
import { TUser } from "@/typeDefinitions/typeDefinitions";

import Modal from "../Modal/Modal";

const Positions = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const userPositions = user.positions;

  if (!userPositions) {
    return null;
  }

  const hasUserPositions = userPositions.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        {isLoggedUser && (
          <Modal
            title="Edit positions"
            description="Search or create"
            icon={
              hasUserPositions ? (
                <Pencil1Icon width={16} color="var(--smart-purple)" />
              ) : (
                <PlusIcon width={16} color="var(--smart-purple)" />
              )
            }
            text={
              <p className="text-[12px] font-normal text-slate-500">
                Positions
              </p>
            }
          >
            <AddPosition userPositions={userPositions} />
          </Modal>
        )}
        {!isLoggedUser && (
          <p className="text-[12px] font-normal text-slate-500">Positions</p>
        )}
      </div>
      {hasUserPositions ? (
        userPositions.map((position) => {
          return (
            <h3 key={position.id} className="font-semibold text-slate-600">
              {position.name}
            </h3>
          );
        })
      ) : (
        <p className="font-semibold text-slate-300">
          Positions have not been added yet
        </p>
      )}
    </div>
  );
};

export default Positions;
