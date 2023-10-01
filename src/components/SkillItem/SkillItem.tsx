import React, { useState } from "react";

import { trpc } from "@/utils/trpc";

export interface IUserSkill {
  title: string;
  id: number;
  rating: number | null;
  authorId: string | null;
}

const SkillItem = ({ skill }: { skill: IUserSkill }) => {
  const [rangeValue, setRangeValue] = useState<number>(skill.rating || 5);

  const updateSkillRating = trpc.users.updateRating.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(e.target.value));
    updateSkillRating.mutate({
      skillId: skill.id,
      rating: Number(e.target.value),
    });
  };

  return (
    <div>
      <div className="flex flex-col mb-4">
        <div className="flex justify-between mb-2">
          <p>{skill.title}</p>
          <p>{rangeValue}%</p>
        </div>

        <input
          type="range"
          name=""
          id=""
          min="5"
          max="100"
          step="5"
          value={rangeValue}
          onChange={handleChange}
          className=""
        />
      </div>
    </div>
  );
};

export default SkillItem;
