import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { FILTERS } from "../utils/constans";

const FiltersReset = ({
  className,
}: {
  className?: React.ComponentProps<"button">["className"];
}) => {
  const { query, pathname, replace } = useRouter();
  const resetAllFilters = () => {
    const params = new URLSearchParams(Object(query));

    params.delete(FILTERS.AVAILABILITY);
    params.delete(FILTERS.SKILLS);
    params.delete(FILTERS.PROJECTS);
    params.delete(FILTERS.MANAGERS);
    params.delete(FILTERS.POSITIONS);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Button
      variant="outline"
      className={cn(
        "border-[--smart-purple] text-[--smart-purple] w-full",
        className,
      )}
      onClick={resetAllFilters}
    >
      Clear all filters
    </Button>
  );
};

export default FiltersReset;
