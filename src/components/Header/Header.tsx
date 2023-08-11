import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import LogoImg from "@/assets/images/logo.svg";
import Switch from "@/components/Switch";
import MobileNav from "@/containers/AppNavigation/MobileNav/MobileNav";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="relative border-b shadow-md py-0 pl-1 pr-4">
      <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto">
        <Link href="/">
          <Image src={LogoImg} alt="Logo" />
        </Link>

        <div className="flex items-center gap-4">
          <Switch checked={isDarkMode} handleChange={handleDarkMode} />
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
