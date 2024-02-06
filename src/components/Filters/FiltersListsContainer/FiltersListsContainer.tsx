import React from "react";

import { useURLSearchParams } from "@/hooks/useURLSearchParams";

import { FILTERS } from "../utils/constans";
import FilterList from "./FiltersList";

const FiltersContainer = () => {
  const { hasSelectedFilters } = useURLSearchParams();

  if (!hasSelectedFilters) {
    return null;
  }

  return (
    <div className="flex justify-start flex-wrap gap-2">
      <FilterList filterName={FILTERS.AVAILABILITY} />
      <FilterList filterName={FILTERS.SKILLS} />
      <FilterList filterName={FILTERS.POSITIONS} />
      <FilterList filterName={FILTERS.PROJECTS} />
      <FilterList filterName={FILTERS.MANAGERS} />
    </div>
  );
};

export default FiltersContainer;
