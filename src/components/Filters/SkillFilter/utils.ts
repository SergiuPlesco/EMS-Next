export const getSkillName = (skill: string) => {
  return skill.split(":")[0];
};

export const getSkillMinRating = (skill: string) => {
  return Number(skill.split(":")[1]);
};

export const getSkillMaxRating = (skill: string) => {
  return Number(skill.split(":")[2]);
};
