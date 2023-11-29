import Image from "next/image";
import Link from "next/link";
import React from "react";

import LogoImg from "@/assets/images/logo.svg";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import DesktopNav from "@/containers/AppNavigation/DesktopNav/DesktopNav";
import MobileNav from "@/containers/AppNavigation/MobileNav/MobileNav";

const Header = () => {
  return (
    <div className="relative border-b shadow-md py-0 pl-1 pr-4">
      <div className="flex justify-between items-center w-full max-w-[1200px] mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" style={{ display: "block" }}>
            <Image src={LogoImg} alt="Logo" width={128} height={59} />
          </Link>
          <div className="hidden md:block">
            <DesktopNav />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="pl-4 hidden md:block">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
