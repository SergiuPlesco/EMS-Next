import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

import NavigationList from "../NavigationList/NavigationList";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    setOpen(false);
  }, [router.pathname]);

  return (
    <div className="">
      <button className="flex items-center" onClick={handleMenu}>
        {open ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>
      {open ? (
        <div className="absolute top-[59px] right-0 left-0 bottom-0 h-screen bg-white">
          <div className="">
            <NavigationList />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
