import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddSkill from "@/components/forms/AddSkill/AddSkill";
import Modal from "@/components/Modal/Modal";
import Skill from "@/components/SkillItem/SkillItem";
import { trpc } from "@/utils/trpc";

const Skills = () => {
  const { data: userSkills, isLoading } = trpc.users.getSkills.useQuery();

  if (isLoading || !userSkills) {
    return null;
  }

  const hasUsersSkills = userSkills.length > 0;

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="font-medium text-xl text-[--smart-green]">Skills</p>
        <Modal
          title="Skills"
          description="Search, add, delete or create a new one."
          icon={
            hasUsersSkills ? (
              <Pencil1Icon width={16} color="var(--smart-purple)" />
            ) : (
              <PlusIcon width={16} color="var(--smart-purple)" />
            )
          }
          text={
            <p className="text-[10px] font-normal text-slate-500">Skills</p>
          }
        >
          <AddSkill />
        </Modal>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasUsersSkills
          ? userSkills?.map((skill) => {
              return (
                <div key={skill.id} className="border rounded p-4">
                  <Skill skill={skill} />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Skills;
