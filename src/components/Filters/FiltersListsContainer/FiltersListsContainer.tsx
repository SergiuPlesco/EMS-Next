import React from "react";

import { useFiltersUrlState } from "@/hooks/useFiltersUrlState";

import { FILTERS } from "../utils/constans";
import FilterList from "./FiltersList";
import FilterListRange from "./FiltersListRange";

const FiltersContainer = () => {
  const { hasSelectedFilters, hasSelectedSkills } = useFiltersUrlState();

  if (!hasSelectedFilters) {
    return null;
  }

  return (
    <div className="flex justify-start flex-wrap gap-2">
      <FilterList filterName={FILTERS.AVAILABILITY} />
      <FilterList filterName={FILTERS.SKILLS} />
      {hasSelectedSkills && <FilterListRange filterName="knowledge" />}
      <FilterList filterName={FILTERS.POSITIONS} />
      <FilterList filterName={FILTERS.PROJECTS} />
      <FilterList filterName={FILTERS.MANAGERS} />
    </div>
  );
};

export default FiltersContainer;
