import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import AddManager from "@/components/forms/AddManager/AddManager";
import { ENDPOINTS } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";

import { FILTERS } from "../Filters/utils/constans";
import Modal from "../Modal/Modal";

const Managers = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const managers = user.managers;
  const { query } = useRouter();

  const createManagerURL = (managerName: string) => {
    const params = new URLSearchParams(Object(query));
    params.set(FILTERS.PAGE, "1");
    params.set(FILTERS.MANAGERS, managerName);
    return `${ENDPOINTS.employees}/?${params.toString()}`;
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
            <AddManager />
          </Modal>
        )}
        {!isLoggedUser && hasManagers && (
          <p className="text-[12px] font-normal text-slate-500">Managers</p>
        )}
      </div>
      {managers?.length > 0 &&
        managers.map((manager) => {
          if (!manager.name) return null;
          return (
            <Link key={manager.id} href={createManagerURL(manager.name)}>
              <h3 className="font-semibold text-slate-600">{manager.name}</h3>
            </Link>
          );
        })}
    </div>
  );
};

export default Managers;
