import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";

import LogoImg from "@/assets/images/logo.svg";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import Switch from "@/components/Switch";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="border shadow-md py-0 pl-1 pr-4">
      <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto">
        <Logo src={LogoImg} alt="Logo" />

        <div className="flex items-center gap-4">
          <Switch checked={isDarkMode} handleChange={handleDarkMode} />

          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default Header;

const Logo = styled(Image)`
  -webkit-user-drag: none;
`;
