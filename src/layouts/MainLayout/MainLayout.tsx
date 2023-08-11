import { useSession } from "next-auth/react";
import React from "react";

import Header from "@/components/Header";
import DesktopNav from "@/containers/AppNavigation/DesktopNav/DesktopNav";

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
        <div className="hidden md:block">
          <DesktopNav />
        </div>
        <div className="w-full p-5 md:p-[25px]">{children}</div>
      </div>
    </>
  );
};

export default MainLayout;
