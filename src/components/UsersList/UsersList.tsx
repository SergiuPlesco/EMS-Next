import { Availability } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";

import { USERS_PER_PAGE } from "@/constants/common";
import { trpc } from "@/utils/trpc";

import Pagination from "../Pagination/Pagination";
import UserCard from "../UserCard/UserCard";
import UserSkeleton from "../UserSkeleton/UserSkeleton";
import NoData from "./NoData";

const UsersList = () => {
  const { query } = useRouter();
  const searchQuery = query.search || "";
  const currentPage = Number(query.page) || 1;
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

  const knowledgeRange =
    typeof query?.knowledge === "string"
      ? (query?.knowledge?.split(",").map(Number) as number[])
      : [];

  const { data, isLoading, isFetching } = trpc.users.filter.useQuery({
    searchQuery: searchQuery as string,
    page: currentPage,
    perPage: USERS_PER_PAGE,
    availability,
    skills,
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
