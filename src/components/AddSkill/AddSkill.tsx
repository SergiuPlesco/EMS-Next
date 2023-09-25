import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

interface ISkill {
  id: number | string;
  title: string;
  rating: number | null;
  createdAt: Date;
}

const AddSkill = () => {
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<ISkill[]>([]);

  const { data: searchList } = trpc.skills.searchSkill.useQuery({
    searchQuery: inputValue,
  });

  const {
    data: userSkills,
    isLoading: isUserSkillsLoading,
    refetch,
  } = trpc.users.getSkills.useQuery();

  const updateSkills = trpc.users.updateSKills.useMutation({
    onSuccess: () => refetch(),
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleOnClick = (title: string) => () => {
    const skillAdded = skills?.find((skill) => skill.title === title);

    if (title === "" || skillAdded) {
      return;
    }

    setSkills([
      ...skills,
      {
        id: generateId(),
        title,
        rating: 5, // default skill level 5%
        createdAt: new Date(),
      },
    ]);
    setInputValue("");
  };
  const handleDelete = (id: number | string) => () => {
    const elementToDeleteIndex = skills.findIndex(
      (position) => position.id === id
    );
    if (elementToDeleteIndex !== -1) {
      const newSkill = [...skills];
      newSkill.splice(elementToDeleteIndex, 1);
      setSkills(newSkill);
    }
  };

  const handleSave = () => {
    updateSkills.mutate({
      skills: [
        ...skills.map((skill) => ({
          title: skill.title,
          rating: skill.rating || 0,
          createdAt: skill.createdAt,
        })),
      ],
    });
  };
  useEffect(() => {
    if (!isUserSkillsLoading && userSkills) {
      setSkills(
        userSkills.map((skill) => ({
          id: generateId(),
          title: skill.title,
          rating: skill.rating,
          createdAt: skill.createdAt,
        }))
      );
    }
  }, [isUserSkillsLoading, userSkills]);

  if (userSkills == null) {
    return null;
  }
  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-1 flex-wrap">
            {skills
              ? skills.map((skill) => {
                  return (
                    <div
                      key={generateId()}
                      className="flex justify-start gap-1 w-fit mb-1 py-1 px-1 rounded bg-slate-200"
                    >
                      <p className="text-slate-500 pr-4 text-sm">
                        {skill.title}
                      </p>
                      <p className="text-sm">{skill.rating}%</p>
                      <button onClick={handleDelete(skill.id)}>
                        <AiOutlineDelete size={16} className="text-[#a12064]" />
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-start w-full">
        <div
          className={`relative w-full transition-all ease-in-out duration-1000 sm:w-full sm:opacity-100 md:w-full md:opacity-100
					`}
        >
          <Autocomplete
            value={inputValue}
            onChange={handleOnChange}
            options={searchList}
            onClick={handleOnClick}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="border rounded px-2 pt-1 pb-2 flex items-center leading-4 text-[16px]"
          onClick={handleSave}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default AddSkill;
