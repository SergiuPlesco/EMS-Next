import React from "react";
import { ImSpinner3 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center w-[1.625rem] h-[1.625rem] rounded-full animate-spin">
      <ImSpinner3 size={28} />
    </div>
  );
};

export default Spinner;
