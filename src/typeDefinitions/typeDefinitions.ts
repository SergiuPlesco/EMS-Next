import {
  Occupancy as UserOccupancy,
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
  occupancy: UserOccupancy;
  skills: UserSkill[];
  projects: UserProject[];
  managers: User[];
  members: User[];
};

export const OccupancyEnum = ["FULL", "PART", "NOT"] as const;
export type Occupancy = (typeof OccupancyEnum)[number];

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
