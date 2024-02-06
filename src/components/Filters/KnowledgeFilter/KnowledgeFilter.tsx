import { useRouter } from "next/router";
import React from "react";

import { Slider } from "@/components/ui/slider";

import { FILTERS } from "../utils/constans";
import FilterWrapper from "../utils/FilterWrapper";

const KnowledgeFilter = () => {
  const { query, pathname, replace } = useRouter();
  const knowledgeRange =
    typeof query?.knowledge === "string"
      ? (query?.knowledge?.split(",").map(Number) as number[])
      : [5, 25];

  const handleSetFilter = (val: number[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.RATING_LEVEL, valString);
    } else {
      params.delete(FILTERS.RATING_LEVEL);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
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
        min={0}
        step={5}
        value={knowledgeRange}
        onValueChange={handleSetFilter}
      />
    </FilterWrapper>
  );
};

export default KnowledgeFilter;
