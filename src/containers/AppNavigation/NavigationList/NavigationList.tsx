import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlineAreaChart } from "react-icons/ai";

import LogoutButton from "../../../components/LogoutButton/LogoutButton";

const navigationTabs = [
  { icon: AiFillHome, path: "/", title: "Home" },
  { icon: AiFillPlusSquare, path: "/add-skill", title: "Add skill" },
  { icon: AiOutlineAreaChart, path: "/analytics", title: "Analytics" },
  { icon: AiOutlineUsergroupAdd, path: "/employees", title: "Employees" },
];

const NavigationList = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 p-2 md:p-4 md:pt-[50px] md:border-r h-[calc(100vh-65px)]">
      {navigationTabs.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="flex items-end md:justify-center pl-4 md:p-0 md:flex-col gap-2 no-underline text-[#000]"
        >
          <item.icon
            color={router.pathname === item.path ? "#A02065" : "#E2E2E2"}
            size={28}
          />
          <p
            className={`text-[12px] md:text-[14px] ${
              router.pathname === item.path ? "text-[#A02065]" : "text-[#000]"
            } `}
          >
            {item.title}
          </p>
        </Link>
      ))}
      <div className="pl-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default NavigationList;
