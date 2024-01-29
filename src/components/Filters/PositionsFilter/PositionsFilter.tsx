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

const PositionsFilter = () => {
  const { query, pathname, replace } = useRouter();
  const positions =
    typeof query?.positions === "string"
      ? (query?.positions?.split(",") as string[])
      : [];

  const { data: positionsList } = trpc.positions.all.useQuery();

  const handleSetFilter = (val: string[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.POSITIONS, valString);
    } else {
      params.delete(FILTERS.POSITIONS);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        <ScrollArea
          className={cn(
            "w-full ",
            positionsList && positionsList?.length >= 10
              ? "h-[225px] md:h-[325px]"
              : "h-full"
          )}
          type="always"
        >
          {positionsList &&
            positionsList.map((item) => {
              if (!item.name) return null;
              return (
                <FilterItemWrapper key={item.id}>
                  <Checkbox
                    className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                    id={item.name}
                    value={item.name || ""}
                    checked={positions.includes(item.name)}
                    onCheckedChange={(checked) => {
                      if (!item.name) return;
                      return checked
                        ? handleSetFilter([...positions, item.name])
                        : handleSetFilter(
                            positions?.filter((value) => value !== item.name)
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

export default PositionsFilter;
