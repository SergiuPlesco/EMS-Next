import { Availability } from "@prisma/client";
import { useRouter } from "next/router";

export const useURLSearchParams = () => {
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

  const ratingRange =
    typeof query?.range === "string"
      ? (query?.range?.split(",").map(Number) as number[])
      : [];

  const hasSelectedAvailability = Boolean(availability.length);
  const hasSelectedSkills = Boolean(skills.length);
  const hasSelectedProjects = Boolean(projects.length);
  const hasSelectedManagers = Boolean(managers.length);
  const hasSelectedPositioins = Boolean(positions.length);
  const hasSelectedRatingRange = Boolean(ratingRange.length);

  const hasSelectedFilters =
    hasSelectedAvailability ||
    hasSelectedSkills ||
    hasSelectedProjects ||
    hasSelectedManagers ||
    hasSelectedPositioins ||
    hasSelectedRatingRange;

  return {
    availability,
    skills,
    projects,
    managers,
    positions,
    ratingRange,
    hasSelectedAvailability,
    hasSelectedSkills,
    hasSelectedProjects,
    hasSelectedManagers,
    hasSelectedPositioins,
    hasSelectedRatingRange,
    hasSelectedFilters,
  };
};
