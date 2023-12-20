import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import AddSkill from "@/components/forms/AddSkill/AddSkill";
import Modal from "@/components/Modal/Modal";
import Skill from "@/components/SkillItem/SkillItem";
import { TUser } from "@/typeDefinitions/typeDefinitions";

const Skills = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const userSkills = user.skills;
  if (!userSkills) {
    return null;
  }

  const hasUsersSkills = userSkills.length > 0;

  return (
    <>
      <div className="flex items-center gap-2">
        {(isLoggedUser || (!isLoggedUser && hasUsersSkills)) && (
          <p className="font-medium text-xl text-[--smart-green]">Skills</p>
        )}
        {isLoggedUser && (
          <Modal
            title="Skills"
            description="Search, add, delete or create a new one."
            icon={
              hasUsersSkills ? (
                <Pencil1Icon
                  width={20}
                  height={20}
                  color="var(--smart-purple)"
                />
              ) : (
                <PlusIcon width={20} height={20} color="var(--smart-purple)" />
              )
            }
          >
            <AddSkill userSkills={userSkills} />
          </Modal>
        )}
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
