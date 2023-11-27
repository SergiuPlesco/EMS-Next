import { Pencil1Icon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

import AddPhone from "@/components/forms/AddPhone/AddPhone";
import { trpc } from "@/utils/trpc";

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
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">{user?.name}</h2>
          <Modal
            title="Edit profile"
            description="Make changes to your profile here. Save each detail."
            icon={<Pencil1Icon width={16} color="var(--smart-purple)" />}
          >
            <AddPhone />
          </Modal>
        </div>
        <p className="text-xs text-slate-500">{user?.email}</p>
        <p className="text-xs text-slate-500">{user?.phone} </p>
      </div>
    </div>
  );
};

export default Identity;
