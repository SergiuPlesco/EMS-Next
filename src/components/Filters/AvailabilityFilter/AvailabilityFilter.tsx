import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Availability,
  AvailabilityEnum,
} from "@/typeDefinitions/typeDefinitions";

import FilterTitle from "../utils/FilterTitle";
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
      params.set("availability", valString);
    } else {
      params.delete("availability");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <FilterTitle title="Availability" />
      <div>
        {AvailabilityItems.map((item) => {
          return (
            <div
              key={item.value}
              className="flex justify-start gap-2 items-center mb-1"
            >
              <Checkbox
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
              <label htmlFor={item.value}>{item.label}</label>
            </div>
          );
        })}
      </div>
    </FilterWrapper>
  );
};

export default AvailabilityFilter;
