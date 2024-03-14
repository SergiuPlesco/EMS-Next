import React from "react";

import LoginButton from "@/components/LoginButton/LoginButton";

const SignInLayout = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 pt-[5rem] mb-4">
      <p className="font-bold text-2xl">my team</p>
      <LoginButton />
    </div>
  );
};

export default SignInLayout;
