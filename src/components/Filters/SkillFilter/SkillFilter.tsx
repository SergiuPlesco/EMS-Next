import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
import FilterWrapper from "../utils/FilterWrapper";
import { getSkillMinRating, getSkillName } from "./utils";

const defaultSkillMinRating = 5;
// const defaultSkillMaxRating = 100;

const SkillFilter = () => {
  const { query, pathname, replace } = useRouter();
  const { skills, skillFilterSearchQuery } = useURLSearchParams();
  const { data: skillsList } = trpc.skills.all.useQuery();

  const handleSetSkills = (val: string[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.SKILLS, valString);
    } else {
      params.delete(FILTERS.SKILLS);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSetSkillLevel = (skillName: string, ratingRange: number[]) => {
    const params = new URLSearchParams(Object(query));

    const skillWithRatingRange = skills.map((skill) => {
      if (getSkillName(skill) === skillName) {
        const skillRating = ratingRange.map(String).join(":");
        const skillString = `${skillName}:${skillRating}`;
        return skillString;
      }
      return skill;
    });

    params.set(FILTERS.SKILLS, skillWithRatingRange.join(","));

    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSetSearchSkill = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    const params = new URLSearchParams(Object(query));

    if (searchQuery) {
      params.set(FILTERS.SKILL_SEARCH_QUERY, searchQuery);
    } else {
      params.delete(FILTERS.SKILL_SEARCH_QUERY);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      {skillsList && skillsList.length >= 15 && (
        <div className="mb-4">
          <Input
            type="search"
            value={skillFilterSearchQuery}
            onChange={handleSetSearchSkill}
            className="text-base"
            placeholder="Search skill..."
          />
        </div>
      )}
      <ScrollArea
        className={cn(
          "w-full pr-2",
          skillsList && skillsList?.length >= 10
            ? "h-[225px] md:h-[325px]"
            : "h-full",
        )}
        type="always"
      >
        {skillsList &&
          skillsList
            .filter((item) => {
              return item.name
                .toLowerCase()
                .includes(skillFilterSearchQuery.toLowerCase());
            })
            .map((item) => {
              return (
                <div key={item.id} className="mb-2">
                  <FilterItemWrapper key={item.id}>
                    <Checkbox
                      className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                      id={item.name}
                      value={item.name}
                      checked={skills
                        .map((skill) => getSkillName(skill))
                        .includes(item.name)}
                      onCheckedChange={(checked) => {
                        checked
                          ? handleSetSkills([...skills, item.name])
                          : handleSetSkills(
                              skills?.filter((value) => {
                                return getSkillName(value) !== item.name;
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

                  {skills.map((skill) => {
                    if (getSkillName(skill) === item.name) {
                      return (
                        <div
                          key={item.id}
                          className="mb-4 pb-4 pr-2 mr-1"
                          style={{
                            boxShadow: "0 10px 10px -10px gray",
                          }}
                        >
                          <div className="flex flex-col">
                            <p className="flex justify-between w-full mb-2">
                              <span>
                                <span className="text-[10px] opacity-80">
                                  Knowledge level at least:{" "}
                                </span>
                                {getSkillMinRating(skill) ||
                                  defaultSkillMinRating}
                                %
                              </span>
                              {/* <span>
                                <span className="text-[10px]">max:</span>
                                {getSkillMaxRating(skill) ||
                                  defaultSkillMaxRating}
                              </span> */}
                            </p>
                            <Slider
                              inverted={false}
                              className="touch-none"
                              max={100}
                              min={0}
                              step={5}
                              value={[
                                getSkillMinRating(skill) ||
                                  defaultSkillMinRating,
                              ]}
                              onValueChange={(newValue) => {
                                handleSetSkillLevel(item.name, newValue);
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              );
            })}
      </ScrollArea>
    </FilterWrapper>
  );
};

export default SkillFilter;
