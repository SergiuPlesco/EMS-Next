import { useSession } from "next-auth/react";
import React from "react";

import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";

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

      <div className="flex">
        <NavigationBar />
        <div className="w-full pt-[50px] pr-[60px] pb-0 pl-[60px]">
          {children}
        </div>
      </div>
    </>
  );
};

export default MainLayout;
