import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
import FilterWrapper from "../utils/FilterWrapper";

const SkillFilter = () => {
  const { query, pathname, replace } = useRouter();
  const { data: skillsList } = trpc.skills.all.useQuery();

  const skills =
    typeof query?.skills === "string"
      ? (query?.skills
          ?.split(",")
          .map((skill) => skill.split(":")[0]) as string[])
      : [];

  const knowledgeRange =
    typeof query?.skills === "string"
      ? (query?.skills?.split(":").map(Number) as number[])
      : [5, 100];

  const handleSetSkills = (val: string[]) => {
    const skillsWithRating =
      typeof query?.skills === "string"
        ? (query?.skills?.split(",") as string[])
        : [];

    const filtered = val.filter((item) => {
      return !skillsWithRating
        .map((skill) => skill.split(":")[0])
        .includes(item);
    });

    const concat = [...skillsWithRating, ...filtered];
    const valString = concat.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.SKILLS, valString);
    } else {
      params.delete(FILTERS.SKILLS);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSetFilter = (skillName: string, ratingRange: number[]) => {
    const params = new URLSearchParams(Object(query));
    const skillsWithRating =
      typeof query?.skills === "string"
        ? (query?.skills?.split(",") as string[])
        : [];
    const mappedskills = skillsWithRating.map((skill) => {
      if (skill.split(":")[0] === skillName) {
        const skillRating = ratingRange.map(String).join(":");
        const skillString = `${skillName}:${skillRating}`;
        return skillString;
      }
      return skill;
    });

    params.set(FILTERS.SKILLS, mappedskills.join(","));

    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        <ScrollArea
          className={cn(
            "w-full ",
            skillsList && skillsList?.length >= 10
              ? "h-[225px] md:h-[325px]"
              : "h-full",
          )}
          type="always"
        >
          {skillsList &&
            skillsList.map((item) => {
              return (
                <div key={item.id}>
                  <FilterItemWrapper key={item.id}>
                    <Checkbox
                      className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                      id={item.name}
                      value={item.name}
                      checked={skills.includes(item.name)}
                      onCheckedChange={(checked) => {
                        checked
                          ? handleSetSkills([...skills, item.name])
                          : handleSetSkills(
                              skills?.filter((value) => {
                                return value !== item.name;
                              }),
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

                  {skills.includes(item.name) && (
                    <div className="mb-4 pb-4 shadow-md">
                      <div className="flex flex-col">
                        <p className="flex justify-between w-full mb-2">
                          <span>
                            <span className="text-[10px]">min:</span>
                            {knowledgeRange[0]}
                          </span>
                          <span>
                            <span className="text-[10px]">max:</span>
                            {knowledgeRange[1]}
                          </span>
                        </p>
                        <Slider
                          max={100}
                          min={5}
                          step={5}
                          value={knowledgeRange}
                          onValueChange={(newValue) => {
                            handleSetFilter(item.name, newValue);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </ScrollArea>
      </div>
    </FilterWrapper>
  );
};

export default SkillFilter;
