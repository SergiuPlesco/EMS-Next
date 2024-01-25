import React from "react";

const FilterWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="border rounded mb-2 p-2">{children}</div>;
};

export default FilterWrapper;
