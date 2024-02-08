import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useURLSearchParams } from "@/hooks/useURLSearchParams";
import { Occupancy, OccupancyEnum } from "@/typeDefinitions/typeDefinitions";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
import FilterWrapper from "../utils/FilterWrapper";

// const AvailabilityItems = [
//   {
//     value: AvailabilityEnum[0],
//     label: "Full Time",
//   },
//   {
//     value: AvailabilityEnum[1],
//     label: "Part Time",
//   },
//   {
//     value: AvailabilityEnum[2],
//     label: "Not Available",
//   },
// ];

const OccupancyItems = [
  {
    value: OccupancyEnum[0],
    label: "Fully Occupied",
  },
  {
    value: OccupancyEnum[1],
    label: "Partially Occupied",
  },
  {
    value: OccupancyEnum[2],
    label: "Not Occupied",
  },
];

const AvailabilityFilter = () => {
  const { query, pathname, replace } = useRouter();
  const { occupancy } = useURLSearchParams();

  const handleSetAvailability = (val: Occupancy[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.OCCUPANCY, valString);
    } else {
      params.delete(FILTERS.OCCUPANCY);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        {OccupancyItems.map((item) => {
          return (
            <FilterItemWrapper key={item.value}>
              <Checkbox
                className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                id={item.value}
                value={item.value}
                checked={occupancy.includes(item.value)}
                onCheckedChange={(checked) => {
                  return checked
                    ? handleSetAvailability([...occupancy, item.value])
                    : handleSetAvailability(
                        occupancy?.filter((value) => value !== item.value),
                      );
                }}
              />
              <Label
                className="cursor-pointer font-normal mt-[1px] leading-4"
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
