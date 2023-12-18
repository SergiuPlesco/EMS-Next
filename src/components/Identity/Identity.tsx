import { Pencil1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

import UserInfo from "@/components/forms/UserInfo/UserInfo";
import { AVAILABILITY_BORDER_COLORS } from "@/constants/common";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

import Modal from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";

const Identity = () => {
  const { data: user, isLoading } = trpc.users.getLoggedUser.useQuery();

  if (isLoading || !user) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-4 items-center mb-6">
      <div
        className={`border-[3px] rounded-full `}
        style={{
          borderColor: AVAILABILITY_BORDER_COLORS[user.availability],
        }}
      >
        <Image
          src={user?.image || ""}
          alt="Profile image"
          width={75}
          height={75}
          className={cn(`rounded-full border  border-white`)}
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
            <UserInfo />
          </Modal>
        </div>
        <p className="text-xs text-slate-500">{user?.email}</p>
        <p className="text-xs text-slate-500">
          {user?.phone}
          {" / "}
          {user?.employmentDate
            ? format(user?.employmentDate, "MMMM, yyyy")
            : ""}
        </p>
      </div>
    </div>
  );
};

export default Identity;
