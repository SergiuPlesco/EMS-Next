import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

import Skill from "@/components/Skill/skill";
import { ISkill } from "@/types/ISkill";
import { trpc } from "@/utils/trpc";

const Skills = () => {
  const { data: fetchedskills } = trpc.skills.skillByUserId.useQuery();
  const { data: fetchedtopSkills } = trpc.skills.fetchTopSkills.useQuery();
  // const { data: skillList } = trpc.skills.all.useQuery();

  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);

  const [skills, setSkills] = useState<Array<ISkill>>([]);

  const handleSearchInputVisibility = () => {
    setIsSearchInputVisible((prevState) => !prevState);
  };

  useEffect(() => {
    if (fetchedskills && fetchedtopSkills) {
      setSkills(fetchedskills);
    }
  }, [fetchedskills, fetchedtopSkills]);

  const handleSkillDelete = (skillId: number) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };
  return (
    <>
      <div
        className={`grid grid-cols-1 h-full transition-all ease-in-out duration-1000 ${
          isSearchInputVisible
            ? "sm:grid-cols-[35%_auto] md:grid-cols-[30%_auto] lg:grid-cols-[25%_auto]"
            : "sm:grid-cols-[1%_auto] md:grid-cols-[1%_auto] lg:grid-cols-[1%_auto]"
        } gap-4`}
      >
        <div className="flex gap-2 items-center">
          <div className="hidden bg-white h-full sm:flex md:flex items-center z-20">
            {!isSearchInputVisible && (
              <button onClick={handleSearchInputVisibility} className="">
                <AiOutlinePlus />
              </button>
            )}
            {isSearchInputVisible && (
              <button onClick={handleSearchInputVisibility}>
                <AiOutlineCheck />
              </button>
            )}
          </div>
          <div
            className={`relative w-full transition-all ease-in-out duration-1000	${
              isSearchInputVisible
                ? "sm:w-full sm:opacity-100 md:w-full md:opacity-100"
                : "sm:w-0 sm:opacity-0 md:w-0 md:opacity-0"
            }`}
          >
            <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-envents-none">
              <AiOutlineSearch />
            </span>
            <input
              type="search"
              className={`border rounded p-2 pl-8 text-sm w-full text-slate-900 `}
              placeholder="Search a skill..."
            />
          </div>
        </div>
        <div className="border h-20">
          {skills.length === 0 ? (
            <div>no skill, add some</div>
          ) : (
            skills?.map((skill) => {
              return (
                <Skill
                  key={skill.id}
                  fetchedSkill={skill}
                  onDelete={handleSkillDelete}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Skills;
