import { Availability } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";

import { FILTERS } from "../utils/constans";
import FilterList from "./FiltersList";
import FilterListRange from "./FiltersListRange";

const FiltersContainer = () => {
  const { query } = useRouter();

  const availability =
    typeof query?.availability === "string"
      ? (query?.availability?.split(",") as Availability[])
      : [];
  const skills =
    typeof query?.skills === "string"
      ? (query?.skills?.split(",") as string[])
      : [];

  const projects =
    typeof query?.projects === "string"
      ? (query?.projects?.split(",") as string[])
      : [];

  const managers =
    typeof query?.managers === "string"
      ? (query?.managers?.split(",") as string[])
      : [];

  const positions =
    typeof query?.positions === "string"
      ? (query?.positions?.split(",") as string[])
      : [];
  const knowledge =
    typeof query?.knowledge === "string"
      ? (query?.knowledge?.split(",") as string[])
      : [];

  const hasSelectedFilters =
    Boolean(availability.length) ||
    Boolean(skills.length) ||
    Boolean(projects.length) ||
    Boolean(managers.length) ||
    Boolean(positions.length) ||
    Boolean(knowledge.length);

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
      <FilterListRange filterName="knowledge" />
    </div>
  );
};

export default FiltersContainer;
