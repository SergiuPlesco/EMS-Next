import { User } from "@prisma/client";
import { UserPosition } from "@prisma/client";

export type TUser = User & {
  positions: UserPosition[];
};

export const AvailabilityEnum = [
  "FULLTIME",
  "PARTTIME",
  "NOTAVAILABLE",
] as const;
export type Availability = (typeof AvailabilityEnum)[number];
