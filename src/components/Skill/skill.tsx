// import { TRPCError } from "@trpc/server";
// import Image from "next/image";
import React from "react";

// import { ISkill } from "@/types/ISkill";
// import { trpc } from "@/utils/trpc";

//

const Skill = ({ skill }: any) => {
  // const [showRatingChange, setShowRatingChange] = useState<boolean>(false);
  // const [apiError, setApiError] = useState<string | null>(null);

  // const deleteSkill = trpc.users.deleteSkill.useMutation();
  // const updateSkillRating = trpc.users.updateSKill.useMutation();

  // const deleteUserSkill = () => {
  // 	deleteSkill.mutate({ skillId: skill.id });
  // 	onDelete(skill.id);
  // };

  // const handleRatingUpdate = (skillId: number, rating: number) => {
  // 	try {
  // 		updateSkillRating.mutate({ rating, skillId });

  // 		setShowRatingChange(false);
  // 		setSkill((prev) => ({ ...prev, rating }));
  // 	} catch (err) {
  // 		if (err instanceof TRPCError) setApiError(err.message);
  // 	}
  // };

  return (
    <div>
      <div className="flex">
        <p>{skill.title}</p>
      </div>
    </div>
  );
};

export default Skill;
