import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddSkill from "@/components/AddSkill/AddSkill";
import Modal from "@/components/Modal/Modal";
import Skill from "@/components/SkillItem/SkillItem";
import { trpc } from "@/utils/trpc";

const Skills = () => {
  const { data: userSkills } = trpc.users.getSkills.useQuery();
  return (
    <div>
      <div className="flex justify-end items-center">
        <Modal
          title="Edit profile"
          description="Make changes to your profile here. Save each detail."
          icon={<PlusIcon width={16} color="var(--smart-purple)" />}
          text={"Add a skill"}
        >
          <AddSkill />
        </Modal>
      </div>
      <div className="border rounded p-4">
        {userSkills && userSkills.length === 0 ? (
          <div>no skill, add some</div>
        ) : (
          userSkills?.map((skill) => {
            return <Skill key={skill.id} skill={skill} />;
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default Skills;
