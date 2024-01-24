import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/utils/trpc";

import FilterTitle from "../utils/FilterTitle";
import FilterWrapper from "../utils/FilterWrapper";

const SkillFilter = () => {
  const { query, pathname, replace } = useRouter();
  const skills =
    typeof query?.skills === "string"
      ? (query?.skills?.split(",") as string[])
      : [];

  const { data: skillsList } = trpc.skills.all.useQuery();

  const handleSetSkills = (val: string[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set("skills", valString);
    } else {
      params.delete("skills");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <FilterTitle title="Skills" />
      <div>
        <ScrollArea className="w-full h-[225px]">
          {skillsList &&
            skillsList.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex justify-start gap-2 items-start mb-1 cursor-pointer"
                >
                  <Checkbox
                    id={item.name}
                    className="mt-1"
                    value={item.name}
                    checked={skills.includes(item.name)}
                    onCheckedChange={(checked) => {
                      return checked
                        ? handleSetSkills([...skills, item.name])
                        : handleSetSkills(
                            skills?.filter((value) => value !== item.name)
                          );
                    }}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              );
            })}
        </ScrollArea>
      </div>
    </FilterWrapper>
  );
};

export default SkillFilter;
