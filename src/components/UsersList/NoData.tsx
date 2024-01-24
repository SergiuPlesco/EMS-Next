import React from "react";

const NoData = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-2">
      <p className="">No employees match the selected filters.</p>
      <p>
        Try adjusting your search criteria or removing some filters to broaden
        your search.
      </p>
    </div>
  );
};

export default NoData;
