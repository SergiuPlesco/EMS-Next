import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

export type IUserSkill = {
  name: string;
  id: number;
  rating: number | null;
  userId: string | null;
};

type SkillItemProps = { skill: IUserSkill; canEdit: boolean };

const SkillItem = ({ skill, canEdit }: SkillItemProps) => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const [rangeValue, setRangeValue] = useState<number>(skill.rating || 5);

  const updateSkillRating = trpc.users.updateRating.useMutation();

  const handleChange = useDebouncedCallback((value: number[]) => {
    setRangeValue(Number(value[0]));
    updateSkillRating.mutate(
      {
        skillId: skill.id,
        rating: Number(value[0]),
      },
      {
        onSuccess: () => {
          toast({
            description: `${skill.name} rating has been updated`,
            variant: "success",
          });
          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  }, 200);

  return (
    <div className="flex flex-col  mb-4">
      <div className="flex justify-between mb-2">
        <p>{skill.name}</p>

        <p>{rangeValue}%</p>
      </div>

      <Slider
        min={0}
        max={100}
        step={5}
        value={[rangeValue]}
        onValueChange={handleChange}
        disabled={!canEdit}
      />
      {/* <CircleProgress
        percentage={skill.rating ? skill.rating : 5}
        size={100}
        strokeWidth={10}
      /> */}
    </div>
  );
};

export default SkillItem;
