import React from "react";
import { BsPencilSquare } from "react-icons/bs";

import { trpc } from "@/utils/trpc";

import AddManager from "../AddManager/AddManager";
import Modal from "../Modal/Modal";

const Managers = () => {
  const { data: managers } = trpc.users.getManagers.useQuery();

  if (!managers) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        <p className="text-slate-500 text-sm">Managers</p>
        <Modal
          title="Edit profile"
          description="Make changes to your profile here. Save each detail."
          icon={<BsPencilSquare size={18} color="var(--smart-purple)" />}
        >
          <AddManager />
        </Modal>
      </div>
      {managers ? (
        managers.managers.map((manager) => {
          return (
            <h3 key={manager.id} className="font-semibold text-slate-600">
              {manager.name}
            </h3>
          );
        })
      ) : (
        <p>No position yet</p>
      )}
    </div>
  );
};

export default Managers;
