import { Availability } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FiltersList = () => {
  const { query } = useRouter();
  //   const searchQuery = query.search || "";
  //   const currentPage = Number(query.page) || 1;
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
  return (
    <div>
      <div>
        <p>Selected filters:</p>
        <div className="flex gap-2">
          {availability.map((item) => {
            return (
              <Badge key={item} className="gap-2 bg-[--smart-purple]">
                {item}
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <Cross2Icon className="text-white hover:text-[black]" />
                </Button>
              </Badge>
            );
          })}
        </div>
        <div className="flex gap-2">
          {skills.map((item) => {
            return (
              <Badge key={item} className="gap-2 bg-[--smart-purple]">
                {item}
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <Cross2Icon className="text-white hover:text-[black]" />
                </Button>
              </Badge>
            );
          })}
        </div>
        <div className="flex gap-2">
          {projects.map((item) => {
            return (
              <Badge key={item} className="gap-2 bg-[--smart-purple]">
                {item}
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <Cross2Icon className="text-white hover:text-[black]" />
                </Button>
              </Badge>
            );
          })}
        </div>
        <div className="flex gap-2">
          {managers.map((item) => {
            return (
              <Badge key={item} className="gap-2 bg-[--smart-purple]">
                {item}
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <Cross2Icon className="text-white hover:text-[black]" />
                </Button>
              </Badge>
            );
          })}
        </div>
        <div className="flex gap-2">
          {positions.map((item) => {
            return (
              <Badge key={item} className="gap-2 bg-[--smart-purple]">
                {item}
                <Button variant="ghost" size="icon" className="h-4 w-4">
                  <Cross2Icon className="text-white hover:text-[black]" />
                </Button>
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FiltersList;
