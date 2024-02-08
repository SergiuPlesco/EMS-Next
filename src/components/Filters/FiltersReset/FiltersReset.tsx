import { useRouter } from "next/router";
import React from "react";

import { Button } from "@/components/ui/button";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import { cn } from "@/lib/utils";

import { FILTERS } from "../utils/constans";

const FiltersReset = ({
  className,
}: {
  className?: React.ComponentProps<"button">["className"];
}) => {
  const { query, pathname, replace } = useRouter();
  const { hasSelectedFilters } = useURLSearchParams();
  const resetAllFilters = () => {
    const params = new URLSearchParams(Object(query));

    params.delete(FILTERS.OCCUPANCY);
    params.delete(FILTERS.SKILLS);
    params.delete(FILTERS.PROJECTS);
    params.delete(FILTERS.MANAGERS);
    params.delete(FILTERS.POSITIONS);

    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Button
      variant="outline"
      disabled={!hasSelectedFilters}
      className={cn(
        "border-[--smart-purple] text-[--smart-purple] w-full disabled:opacity-100",
        className,
      )}
      onClick={resetAllFilters}
    >
      {hasSelectedFilters ? "Clear all filters" : "Filters"}
    </Button>
  );
};

export default FiltersReset;
