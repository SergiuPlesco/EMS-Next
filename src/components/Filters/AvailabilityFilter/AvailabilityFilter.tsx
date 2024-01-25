import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Availability,
  AvailabilityEnum,
} from "@/typeDefinitions/typeDefinitions";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
import FilterWrapper from "../utils/FilterWrapper";

const AvailabilityItems = [
  {
    value: AvailabilityEnum[0],
    label: "Full Time",
  },
  {
    value: AvailabilityEnum[1],
    label: "Part Time",
  },
  {
    value: AvailabilityEnum[2],
    label: "Not Available",
  },
];

const AvailabilityFilter = () => {
  const { query, pathname, replace } = useRouter();
  const availability =
    typeof query?.availability === "string"
      ? (query?.availability?.split(",") as Availability[])
      : [];

  const handleSetAvailability = (val: Availability[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.AVAILABILITY, valString);
    } else {
      params.delete(FILTERS.AVAILABILITY);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        {AvailabilityItems.map((item) => {
          return (
            <FilterItemWrapper key={item.value}>
              <Checkbox
                className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                id={item.value}
                value={item.value}
                checked={availability.includes(item.value)}
                onCheckedChange={(checked) => {
                  return checked
                    ? handleSetAvailability([...availability, item.value])
                    : handleSetAvailability(
                        availability?.filter((value) => value !== item.value)
                      );
                }}
              />
              <Label
                className="cursor-pointer font-normal mt-[1px]"
                htmlFor={item.value}
              >
                {item.label}
              </Label>
            </FilterItemWrapper>
          );
        })}
      </div>
    </FilterWrapper>
  );
};

export default AvailabilityFilter;
