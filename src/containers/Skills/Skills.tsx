import React from "react";

import Skill from "@/components/SkillItem/SkillItem";
import { trpc } from "@/utils/trpc";

const Skills = () => {
  const { data: userSkills } = trpc.users.getSkills.useQuery();

  return (
    <div className="border rounded p-4">
      {userSkills && userSkills.length === 0 ? (
        <div>no skill, add some</div>
      ) : (
        userSkills?.map((skill) => {
          return <Skill key={skill.id} skill={skill} />;
        })
      )}
    </div>
  );
};

export default Skills;
