import Image from "next/image";
import Link from "next/link";
import React from "react";

import { TUser } from "@/typeDefinitions/typeDefinitions";

const UserCard = ({ user }: { user: TUser }) => {
  return (
    <Link href={"/"}>
      <div className="rounded-md shadow-md border w-full">
        <div className="rounded-md">
          <Image
            src={user.image || ""}
            alt="profile image"
            width="200"
            height="250"
            quality={100}
            className="w-full h-full rounded-t-md"
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
      </div>
    </Link>
  );
};

export default UserCard;
