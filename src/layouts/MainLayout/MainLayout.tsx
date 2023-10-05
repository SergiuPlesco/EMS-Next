import { useSession } from "next-auth/react";
import React from "react";

import Header from "@/components/Header/Header";

import SignInLayout from "../SignInLayout/SignInLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { status } = useSession();

  if (status === "unauthenticated") {
    return <SignInLayout />;
  }

  return (
    <>
      <Header />

      <div className="flex max-w-[1200px] mx-auto">
        <div className="w-full p-5 md:mt-[25px]">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
