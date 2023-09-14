import React, { useState } from "react";

import { trpc } from "@/utils/trpc";

export interface IUserSkill {
  title: string;
  id: number;
  rating: number | null;
  authorId: string | null;
}

const SkillItem = ({ skill }: { skill: IUserSkill }) => {
  const [rangeValue, setRangeValue] = useState<number>(skill.rating || 0);

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
        {/* <div className="w-full relative h-[5px] ">
					<div className="w-1/2 h-full absolute top-0 left-0 z-20 bg-indigo-500 opacity-75" />
					<div className="w-full h-full absolute top-0 left-0 z-10 bg-indigo-500 opacity-25" />
				</div> */}
        <input
          type="range"
          name=""
          id=""
          min="0"
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
