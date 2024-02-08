import { useRouter } from "next/router";
import React from "react";

import { USERS_PER_PAGE } from "@/constants/common";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import { trpc } from "@/utils/trpc";

import {
  getSkillMaxRating,
  getSkillMinRating,
  getSkillName,
} from "../Filters/SkillFilter/utils";
import Pagination from "../Pagination/Pagination";
import UserCard from "../UserCard/UserCard";
import UserSkeleton from "../UserSkeleton/UserSkeleton";
import NoData from "./NoData";

const UsersList = () => {
  const { query } = useRouter();
  const searchQuery = query.search || "";
  const currentPage = Number(query.page) || 1;
  const { occupancy, projects, managers, positions, ratingRange, skills } =
    useURLSearchParams();

  const selectedSkillsWithRatingRange = skills.map((skill) => {
    return {
      name: getSkillName(skill),
      ratingRange: [
        getSkillMinRating(skill) || 5,
        getSkillMaxRating(skill) || 100,
      ],
    };
  });

  const { data, isLoading, isFetching } = trpc.users.filter.useQuery({
    searchQuery: searchQuery as string,
    page: currentPage,
    perPage: USERS_PER_PAGE,
    occupancy,
    skills: selectedSkillsWithRatingRange,
    projects,
    managers,
    positions,
    ratingRange,
  });

  if (isLoading || isFetching) {
    return <UserSkeleton />;
  }
  if (data?.users.length === 0) {
    return <NoData />;
  }
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {data &&
          data.users.length > 0 &&
          data.users.map((user) => {
            return <UserCard key={user.id} user={user} />;
          })}
      </div>
      <Pagination totalPages={data?.pagination.totalPages || 0} />
    </div>
  );
};

export default UsersList;
