import React from "react";

const FilterItemWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-start gap-2 items-start mb-3 last-of-type:mb-0">
      {children}
    </div>
  );
};

export default FilterItemWrapper;
