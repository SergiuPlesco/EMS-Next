import { Pencil1Icon } from "@radix-ui/react-icons";
import React from "react";

import { TUser } from "@/typeDefinitions/typeDefinitions";

import AssignRole from "../forms/AssignRole/AssignRole";
import Modal from "../Modal/Modal";

const UserManager = ({ user }: { user: TUser }) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        <Modal
          title="Manage user"
          description="Assign a new role or delete the user"
          icon={<Pencil1Icon width={16} color="var(--smart-purple)" />}
          text={
            <p className="text-[12px] font-normal text-slate-500">
              Manage User
            </p>
          }
        >
          <AssignRole user={user} />
        </Modal>
      </div>
      <h3 className="font-semibold text-slate-600 capitalize">{user.role}</h3>
    </div>
  );
};

export default UserManager;
