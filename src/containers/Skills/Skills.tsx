import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineCheck } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
// import Skill from "@/components/SkillItem/SkillItem";
// import { ISkill } from "@/types/ISkill";
import { trpc } from "@/utils/trpc";

const Skills = () => {
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // const { data: fetchedskills, refetch } = trpc.skills.skillByUserId.useQuery();

  const { data: searchList } = trpc.skills.searchSkill.useQuery({
    searchQuery: inputValue,
  });

  // const addSkill = trpc.users.addSKill.useMutation({
  // 	onSuccess: () => refetch(),
  // });

  // const createSkill = trpc.skills.create.useMutation({
  //   onSuccess: () => refetch(),
  // });

  const handleSearchInputVisibility = () => {
    setIsSearchInputVisible((prevState) => !prevState);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleOnClick = () => () => {
    // createSkill.mutate({
    //   skillTitle,
    // });
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
        <div className="flex gap-2 items-start">
          <div className="flex gap-2 items-start w-full">
            <div className="hidden bg-white sm:flex z-20 mt-3">
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
              <Autocomplete
                value={inputValue}
                onChange={handleOnChange}
                options={searchList}
                onClick={handleOnClick}
              />
            </div>
          </div>
        </div>
        {/* <div className="border">
					{fetchedskills && fetchedskills.length === 0 ? (
						<div>no skill, add some</div>
					) : (
						fetchedskills?.map((skill) => {
							return <Skill key={skill.id} skill={skill} />;
						})
					)}
				</div> */}
      </div>
    </>
  );
};

export default Skills;
