import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddManager from "@/components/forms/AddManager/AddManager";
import { TUser } from "@/typeDefinitions/typeDefinitions";

import Modal from "../Modal/Modal";

const Managers = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const managers = user.managers;

  if (!managers) {
    return null;
  }

  const hasManagers = managers.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        {isLoggedUser ? (
          <Modal
            title="Edit managers"
            description="Search and add your project manager/s"
            icon={
              hasManagers ? (
                <Pencil1Icon width={16} color="var(--smart-purple)" />
              ) : (
                <PlusIcon width={16} color="var(--smart-purple)" />
              )
            }
            text={
              <p className="text-[10px] font-normal text-slate-500">Managers</p>
            }
          >
            <AddManager />
          </Modal>
        ) : (
          <p className="text-[10px] font-normal text-slate-500">Managers</p>
        )}
      </div>
      {managers?.length > 0 &&
        managers.map((manager) => {
          return (
            <h3 key={manager.id} className="font-semibold text-slate-600">
              {manager.name}
            </h3>
          );
        })}
    </div>
  );
};

export default Managers;
