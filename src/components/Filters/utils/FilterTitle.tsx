import React from "react";

const FilterTitle = ({ title }: { title: React.ReactNode | string }) => {
  return <h2 className="font-medium mb-4">{title}</h2>;
};

export default FilterTitle;
