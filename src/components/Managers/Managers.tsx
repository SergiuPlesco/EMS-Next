import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import AddManager from "@/components/forms/AddManager/AddManager";
import { ENDPOINTS } from "@/constants/common";
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

  const createManagerURL = (managerId: string) => {
    return `${ENDPOINTS.employees}/${managerId}`;
  };

  if (!managers) {
    return null;
  }

  const hasManagers = managers.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        {isLoggedUser && (
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
              <p className="text-[12px] font-normal text-slate-500">Managers</p>
            }
          >
            <AddManager managers={managers} />
          </Modal>
        )}
        {!isLoggedUser && (
          <p className="text-[12px] font-normal text-slate-500">Managers</p>
        )}
      </div>
      {hasManagers ? (
        managers.map((manager) => {
          return (
            <Link key={manager.id} href={createManagerURL(manager.id)}>
              <h3 className="font-semibold text-slate-600">{manager.name}</h3>
            </Link>
          );
        })
      ) : (
        <p className="font-semibold text-slate-300">
          Managers have not been added yet
        </p>
      )}
    </div>
  );
};

export default Managers;
