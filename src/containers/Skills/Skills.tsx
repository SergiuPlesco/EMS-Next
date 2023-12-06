import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddSkill from "@/components/forms/AddSkill/AddSkill";
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
          text={"Add/Remove Skills"}
        >
          <AddSkill />
        </Modal>
      </div>

      {userSkills &&
        userSkills.length > 0 &&
        userSkills?.map((skill) => {
          return (
            <div key={skill.id} className="border rounded p-4 mb-2">
              <Skill skill={skill} />
            </div>
          );
        })}
    </div>
  );
};

export default Skills;
