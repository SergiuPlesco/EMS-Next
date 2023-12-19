import React, { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { trpc } from "@/utils/trpc";

export interface IUserSkill {
  name: string;
  id: number;
  rating: number | null;
  userId: string | null;
}

const SkillItem = ({ skill }: { skill: IUserSkill }) => {
  const [rangeValue, setRangeValue] = useState<number>(skill.rating || 5);

  const updateSkillRating = trpc.users.updateRating.useMutation();

  const handleChange = (value: number[]) => {
    setRangeValue(Number(value[0]));
    updateSkillRating.mutate({
      skillId: skill.id,
      rating: Number(value[0]),
    });
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between mb-2">
        <p>{skill.name}</p>

        <p>{rangeValue}%</p>
      </div>

      <Slider
        min={5}
        max={100}
        step={5}
        value={[rangeValue]}
        onValueChange={handleChange}
      />
    </div>
  );
};

export default SkillItem;
