import { User } from "@prisma/client";
import {
  Availability as UserAvailability,
  UserPosition,
  UserProject,
  UserSkill,
} from "@prisma/client";

export type TUser = User & {
  positions?: UserPosition[];
  availability?: UserAvailability;
  skills?: UserSkill[];
  projects?: UserProject[];
  managers?: User[];
};

export const AvailabilityEnum = [
  "FULLTIME",
  "PARTTIME",
  "NOTAVAILABLE",
] as const;
export type Availability = (typeof AvailabilityEnum)[number];
