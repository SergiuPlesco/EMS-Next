import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddManager from "@/components/forms/AddManager/AddManager";
import { trpc } from "@/utils/trpc";

import Modal from "../Modal/Modal";

const Managers = () => {
  const { data: managers, isLoading } = trpc.users.getManagers.useQuery();

  if (isLoading || !managers) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        <Modal
          title="Edit managers"
          description="Search and add your project manager/s"
          icon={<PlusIcon width={16} color="var(--smart-purple)" />}
          text="Add/Remove managers"
        >
          <AddManager />
        </Modal>
      </div>
      {managers.managers?.length > 0 &&
        managers.managers.map((manager) => {
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
