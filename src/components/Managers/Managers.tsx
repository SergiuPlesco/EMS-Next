import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddManager from "@/components/forms/AddManager/AddManager";
import { trpc } from "@/utils/trpc";

import Modal from "../Modal/Modal";

const Managers = () => {
  const { data, isLoading } = trpc.users.getManagers.useQuery();

  if (isLoading || !data) {
    return null;
  }

  const hasManagers = data.managers.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
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
      </div>

      {hasManagers
        ? data.managers.map((manager) => {
            return (
              <h3 key={manager.id} className="font-semibold text-slate-600">
                {manager.name}
              </h3>
            );
          })
        : null}
    </div>
  );
};

export default Managers;
