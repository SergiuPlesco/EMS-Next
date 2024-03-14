import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import LogoutButton from "../../../components/LogoutButton/LogoutButton";

const navigationTabs = [
  { icon: AiOutlineUsergroupAdd, path: "/people", title: "People" },
];

const NavigationList = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-5">
      {navigationTabs.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="flex items-end md:items-start md:justify-center pl-4 md:p-0 md:flex-col gap-2 no-underline text-[#000]"
        >
          <p
            className={`text-[14px] hover:text-[#A02065] ${
              router.pathname === item.path ? "text-[#A02065]" : "text-[#000]"
            } `}
          >
            {item.title}
          </p>
        </Link>
      ))}
      <div className="pl-4 md:hidden">
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavigationList;
