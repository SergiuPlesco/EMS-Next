import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import AddManager from "@/components/forms/AddManager/AddManager";
import { ENDPOINTS } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";

import Modal from "../Modal/Modal";

const Members = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const members = user.members;

  const createMemberURL = (memberId: string) => {
    return `${ENDPOINTS.employees}/${memberId}`;
  };

  if (!members) {
    return null;
  }

  const hasManagers = members.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        {isLoggedUser && (
          <Modal
            title="Edit members"
            description="Search and add your project manager/s"
            icon={
              hasManagers ? (
                <Pencil1Icon width={16} color="var(--smart-purple)" />
              ) : (
                <PlusIcon width={16} color="var(--smart-purple)" />
              )
            }
            text={
              <p className="text-[12px] font-normal text-slate-500">Members</p>
            }
          >
            {/* managers prop should be members here */}
            <AddManager managers={members} />
          </Modal>
        )}
        {!isLoggedUser && hasManagers && (
          <p className="text-[12px] font-normal text-slate-500">Members</p>
        )}
      </div>
      {members?.length > 0 &&
        members.map((manager) => {
          if (!manager.name) return null;
          return (
            <Link key={manager.id} href={createMemberURL(manager.id)}>
              <h3 className="font-semibold text-slate-600">{manager.name}</h3>
            </Link>
          );
        })}
    </div>
  );
};

export default Members;
