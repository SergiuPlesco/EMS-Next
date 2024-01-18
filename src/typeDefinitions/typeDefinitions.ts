import {
  Availability as UserAvailability,
  Position,
  Project,
  Skill,
  User,
  UserPosition,
  UserProject,
  UserSkill,
} from "@prisma/client";

export type TUser = User & {
  positions: UserPosition[];
  availability: UserAvailability;
  skills: UserSkill[];
  projects: UserProject[];
  managers: User[];
};

export const AvailabilityEnum = [
  "FULLTIME",
  "PARTTIME",
  "NOTAVAILABLE",
] as const;
export type Availability = (typeof AvailabilityEnum)[number];

export type Option =
  | Position
  | User
  | Project
  | Skill
  | UserSkill
  | UserProject
  | UserPosition
  | { id: string; name: string };

export type TagListProps = {
  options: Option[];
  onDelete: (id: number | string, name: string) => () => void;
  onSelect?: (tag: any) => () => void;
  selectedId?: number;
  isSelectable?: boolean;
};

export type TagItemProps = {
  option: Option;
  onDelete: (id: number | string, name: string) => () => void;
};
