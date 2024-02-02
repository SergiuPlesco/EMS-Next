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
      params.set(FILTERS.KNOWLEDGE, valString);
    } else {
      params.delete(FILTERS.KNOWLEDGE);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
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
