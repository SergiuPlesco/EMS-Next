import Image from "next/image";
import React from "react";

interface Props {
  userImage: string;
  userName: string;
  userEmail: string;
}

const Identity = ({ userImage, userName, userEmail }: Props) => {
  return (
    <div className="flex gap-4 items-center mb-6">
      <div>
        <Image
          src={userImage}
          alt="Profile image"
          width={75}
          height={75}
          className="rounded-full"
          priority
        />
      </div>

      <div>
        <h2 className="text-xl font-bold">{userName}</h2>
        <p className="text-xs text-slate-500">{userEmail}</p>
      </div>
    </div>
  );
};

export default Identity;
