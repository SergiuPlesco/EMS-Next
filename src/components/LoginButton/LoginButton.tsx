import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

import googleIcon from "../../../public/googleIcon.svg";

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const handleSignin = () => {
    if (status === "unauthenticated") {
      setIsLoading(true);
    }
    signIn("google");
  };

  return (
    <button
      onClick={handleSignin}
      className="flex items-center gap-4 border-0 rounded bg-white py-2 px-16 shadow-[1px_1px_3px_rgba(102,44,145,0.8),-1px_-1px_3px_rgba(161,32,100,0.8)]"
    >
      <div
        className={`flex justify-center items-center w-[1.625rem] h-[1.625rem] rounded-full ${
          isLoading ? "animate-spin" : ""
        }`}
      >
        <Image src={googleIcon} width={32} height={32} alt="" />
      </div>
      Sign in with Google
    </button>
  );
};

export default LoginButton;
