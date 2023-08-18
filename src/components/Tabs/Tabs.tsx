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
      <ul className="flex gap-4">
        {elements.map((element, index: number) => {
          return (
            <li
              key={generateId()}
              onClick={handleTabChange(index)}
              className="cursor-pointer"
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
