import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";

import { FILTERS } from "../utils/constans";

const FiltersReset = () => {
  const { query, pathname, replace } = useRouter();
  const resetAllFilters = () => {
    const params = new URLSearchParams(Object(query));

    params.delete(FILTERS.AVAILABILITY);
    params.delete(FILTERS.SKILLS);
    params.delete(FILTERS.PROJECTS);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Button
      variant="outline"
      className="border-[--smart-purple] w-full text-[--smart-purple]"
      onClick={resetAllFilters}
    >
      Reset all filters
    </Button>
  );
};

export default FiltersReset;
