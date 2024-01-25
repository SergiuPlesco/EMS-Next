import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/utils/trpc";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
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
      params.set(FILTERS.SKILLS, valString);
    } else {
      params.delete(FILTERS.SKILLS);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        <ScrollArea className="w-full h-[325px]" type="always">
          {skillsList &&
            skillsList.map((item) => {
              return (
                <FilterItemWrapper key={item.id}>
                  <Checkbox
                    className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                    id={item.name}
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
                  <Label
                    className="cursor-pointer font-normal mt-[1px]"
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

export default SkillFilter;
