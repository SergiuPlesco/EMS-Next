import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { MdAddBox } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";

const navigationTabs = [
  { icon: AiFillHome, path: "/", title: "Home" },
  { icon: MdAddBox, path: "/add-skill", title: "Add skill" },
  { icon: SiSimpleanalytics, path: "/analytics", title: "Analytics" },
  { icon: BsPeopleFill, path: "/employees", title: "Employees" },
];

const NavigationBar = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5 p-2 md:p-4 border-r h-[calc(100vh-65px)]">
      {navigationTabs.map((item, index) => (
        <Link
          href={item.path}
          key={index}
          className="flex items-center justify-center flex-col gap-2 no-underline text-[#000]"
        >
          <item.icon
            color={router.pathname === item.path ? "#A02065" : "#E2E2E2"}
            size={28}
          />
          <p
            className={`text-[12px] md:text-[14px] hidden md:block ${
              router.pathname === item.path ? "text-[#A02065]" : "text-[#000]"
            } `}
          >
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default NavigationBar;
