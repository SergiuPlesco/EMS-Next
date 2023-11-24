import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

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
          title="Edit managers"
          description="Search and add your project manager/s"
          icon={<PlusIcon width={16} color="var(--smart-purple)" />}
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
