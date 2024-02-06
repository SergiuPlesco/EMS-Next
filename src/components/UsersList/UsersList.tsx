import { useRouter } from "next/router";
import React from "react";

import { USERS_PER_PAGE } from "@/constants/common";
import { useFiltersUrlState } from "@/hooks/useFiltersUrlState";
import { trpc } from "@/utils/trpc";

import Pagination from "../Pagination/Pagination";
import UserCard from "../UserCard/UserCard";
import UserSkeleton from "../UserSkeleton/UserSkeleton";
import NoData from "./NoData";

const UsersList = () => {
  const { query } = useRouter();
  const searchQuery = query.search || "";
  const currentPage = Number(query.page) || 1;
  const {
    availability,
    projects,
    managers,
    positions,
    knowledgeRange,
    skills,
  } = useFiltersUrlState();

  const skillToFilter = skills.map((skill) => {
    return {
      name: skill.split(":")[0],
      ratingRange: [
        Number(skill.split(":")[1]) || 5,
        Number(skill.split(":")[2] || 100),
      ],
    };
  });

  const { data, isLoading, isFetching } = trpc.users.filter.useQuery({
    searchQuery: searchQuery as string,
    page: currentPage,
    perPage: USERS_PER_PAGE,
    availability,
    skills: skillToFilter,
    projects,
    managers,
    positions,
    knowledgeLevel: knowledgeRange,
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
