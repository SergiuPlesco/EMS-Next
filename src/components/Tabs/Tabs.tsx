import React, { useState } from "react";

import generateId from "@/utils/generateId";

type Props = {
  elements: {
    label: string;
    component: React.ReactNode;
  }[];
};

const Tabs = ({ elements }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (currentTab: number) => () => {
    setActiveTab(currentTab);
  };
  return (
    <div>
      <ul className="flex gap-4 w-full border-b mb-4 md:mb-8">
        {elements.map((element, index: number) => {
          return (
            <li
              key={generateId()}
              onClick={handleTabChange(index)}
              className={`cursor-pointer border-b mb-[-1px] p-2 ${
                activeTab === index
                  ? "border-[#662d91] text-[#662d91]"
                  : "text-slate-500"
              }`}
            >
              {element.label}
            </li>
          );
        })}
      </ul>

      {elements.map((element, index) => {
        return (
          <div
            key={generateId()}
            className={`${activeTab === index ? "" : "hidden"}`}
          >
            {element.component}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
