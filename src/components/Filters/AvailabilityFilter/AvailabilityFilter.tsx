import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Availability,
  AvailabilityEnum,
} from "@/typeDefinitions/typeDefinitions";

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

type AvailabilityProps = {
  availability: Availability[];
  setAvailability: (arg: Availability[]) => void;
};

const AvailabilityFilter = ({
  availability,
  setAvailability,
}: AvailabilityProps) => {
  return (
    <div>
      <h2 className="font-medium mb-4">Availability</h2>
      <div>
        {AvailabilityItems.map((item) => {
          return (
            <div
              key={item.value}
              className="flex justify-start gap-2 items-center"
            >
              <Checkbox
                value={item.value}
                checked={availability.includes(item.value)}
                onCheckedChange={(checked) => {
                  return checked
                    ? setAvailability([...availability, item.value])
                    : setAvailability(
                        availability?.filter((value) => value !== item.value)
                      );
                }}
              />
              <p>{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailabilityFilter;
