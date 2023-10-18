import Image from "next/image";
import React from "react";
import { BsPencilSquare } from "react-icons/bs";

import { trpc } from "@/utils/trpc";

import AddPhone from "../AddPhone/AddPhone";
import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

const Identity = () => {
  const { data: user, isLoading } = trpc.users.getLoggedUser.useQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 items-center mb-6">
      <div>
        <Image
          src={user?.image || ""}
          alt="Profile image"
          width={75}
          height={75}
          className="rounded-full"
          priority
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className="text-xs text-slate-500">{user?.email}</p>
        <p className="text-xs text-slate-500">{user?.phone} </p>
      </div>

      <Modal
        title="Edit profile"
        description="Make changes to your profile here. Save each detail."
        icon={<BsPencilSquare size={18} color="var(--smart-purple)" />}
      >
        <AddPhone />
      </Modal>
    </div>
  );
};

export default Identity;
