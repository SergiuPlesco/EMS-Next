import { Occupancy } from "@prisma/client";
import { useRouter } from "next/router";

export const useURLSearchParams = () => {
  const { query } = useRouter();

  const occupancy =
    typeof query?.occupancy === "string"
      ? (query?.occupancy?.split(",") as Occupancy[])
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

  const ratingRange =
    typeof query?.range === "string"
      ? (query?.range?.split(",").map(Number) as number[])
      : [];

  const skillFilterSearchQuery =
    typeof query?.skillSearchQuery === "string" ? query?.skillSearchQuery : "";

  const hasSelectedOccupancy = Boolean(occupancy.length);
  const hasSelectedSkills = Boolean(skills.length);
  const hasSelectedProjects = Boolean(projects.length);
  const hasSelectedManagers = Boolean(managers.length);
  const hasSelectedPositioins = Boolean(positions.length);
  const hasSelectedRatingRange = Boolean(ratingRange.length);
  const hasSkillFilterSearchQuery = Boolean(skillFilterSearchQuery);

  const hasSelectedFilters =
    hasSelectedOccupancy ||
    hasSelectedSkills ||
    hasSelectedProjects ||
    hasSelectedManagers ||
    hasSelectedPositioins ||
    hasSelectedRatingRange ||
    hasSkillFilterSearchQuery;

  return {
    occupancy,
    skills,
    projects,
    managers,
    positions,
    ratingRange,
    hasSelectedOccupancy,
    hasSelectedSkills,
    hasSelectedProjects,
    hasSelectedManagers,
    hasSelectedPositioins,
    hasSelectedRatingRange,
    hasSelectedFilters,
    skillFilterSearchQuery,
    hasSkillFilterSearchQuery,
  };
};
