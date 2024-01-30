import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { ENDPOINTS } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";

import AddTeamMember from "../forms/AddTeamMember/AddTeamMember";
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

  const hasMembers = members.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        {isLoggedUser && (
          <Modal
            title="Team members"
            description="Search and add your team member/s"
            icon={
              hasMembers ? (
                <Pencil1Icon width={16} color="var(--smart-purple)" />
              ) : (
                <PlusIcon width={16} color="var(--smart-purple)" />
              )
            }
            text={
              <p className="text-[12px] font-normal text-slate-500">
                Team Members
              </p>
            }
          >
            <AddTeamMember teamMembers={members} />
          </Modal>
        )}
        {!isLoggedUser && (
          <p className="text-[12px] font-normal text-slate-500">Team Members</p>
        )}
      </div>
      {hasMembers ? (
        members.map((manager) => {
          if (!manager.name) return null;
          return (
            <Link key={manager.id} href={createMemberURL(manager.id)}>
              <h3 className="font-semibold text-slate-600">{manager.name}</h3>
            </Link>
          );
        })
      ) : (
        <p className="font-semibold text-slate-300">
          Team members have not been added yet
        </p>
      )}
    </div>
  );
};

export default Members;
