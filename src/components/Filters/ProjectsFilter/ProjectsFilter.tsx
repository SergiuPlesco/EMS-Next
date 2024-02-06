import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
import FilterWrapper from "../utils/FilterWrapper";

const ProjectsFilter = () => {
  const { query, pathname, replace } = useRouter();
  const projects =
    typeof query?.projects === "string"
      ? (query?.projects?.split(",") as string[])
      : [];

  const { data: projectsList } = trpc.projects.all.useQuery();

  const handleSetFilter = (val: string[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.PROJECTS, valString);
    } else {
      params.delete(FILTERS.PROJECTS);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        <ScrollArea
          className={cn(
            "w-full pr-2",
            projectsList && projectsList?.length >= 10
              ? "h-[225px] md:h-[325px]"
              : "h-full",
          )}
          type="always"
        >
          {projectsList &&
            projectsList.map((item) => {
              return (
                <FilterItemWrapper key={item.id}>
                  <Checkbox
                    className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                    id={item.name}
                    value={item.name}
                    checked={projects.includes(item.name)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? handleSetFilter([...projects, item.name])
                        : handleSetFilter(
                            projects?.filter((value) => value !== item.name),
                          );
                    }}
                  />
                  <Label
                    className="cursor-pointer font-normal mt-[1px] leading-4"
                    htmlFor={item.name}
                  >
                    {item.name}
                  </Label>
                </FilterItemWrapper>
              );
            })}
        </ScrollArea>
      </div>
    </FilterWrapper>
  );
};

export default ProjectsFilter;
