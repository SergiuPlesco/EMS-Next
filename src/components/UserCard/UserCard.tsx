import Image from "next/image";
import Link from "next/link";
import React from "react";

import { AVAILABILITY_BORDER_COLORS } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";

const UserCard = ({ user }: { user: TUser }) => {
  return (
    <div className="rounded-md shadow-md border w-full ">
      <Link
        href={`/employees/${user.id}`}
        className="flex flex-col items-start justify-start"
      >
        <div
          className={`border-[3px] m-3 rounded-full `}
          style={{
            borderColor: AVAILABILITY_BORDER_COLORS[user.availability],
          }}
        >
          <Image
            src={user?.image || ""}
            alt="Profile image"
            width={75}
            height={75}
            className="rounded-full border  border-white"
            priority
          />
        </div>
        <div className="rounded-b-md p-3 bg-white">
          <p className="font-extrabold">{user.name}</p>
          <div className="flex flex-col">
            {user.positions.map((position) => {
              return (
                <span key={position.id} className="text-xs text-slate-500">
                  {position.name}
                </span>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
