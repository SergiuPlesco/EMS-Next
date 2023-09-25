import Image from "next/image";
import React from "react";

import { trpc } from "@/utils/trpc";

const Identity = () => {
  const { data: user, isLoading } = trpc.users.getLoggedUser.useQuery();

  if (isLoading) {
    return null;
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
    </div>
  );
};

export default Identity;
