import { signOut, useSession } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    return (
      <button
        className="border-0 cursor-pointer flex items-center rounded py-1 px-2 text-[14px] bg-transparent shadow-[1px_1px_2px_rgba(102,44,145,0.5),-1px_-1px_2px_rgba(161,32,100,0.5)]"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    );
  }
  return null;
};

export default LogoutButton;
