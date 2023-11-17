import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";

export interface ISkill {
  id: number;
  name: string;
  rating: number | null;
  createdAt: Date;
}

const AddSkill = () => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<ISkill[]>([]);

  const utils = trpc.useContext();

  const { data: searchList } = trpc.skills.searchSkill.useQuery({
    searchQuery: inputValue,
  });

  const {
    data: userSkills,
    isLoading: isUserSkillsLoading,
    refetch,
  } = trpc.users.getSkills.useQuery();

  // const updateSkills = trpc.users.updateSKills.useMutation({
  //   onSuccess: () => refetch(),
  // });

  const createSkill = trpc.skills.create.useMutation();
  const deleteSkill = trpc.skills.delete.useMutation();
  const deleteSkillFromUser = trpc.users.deleteSkill.useMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleOnClick = (title: string) => () => {
    const skillAdded = skills?.find((skill) => skill.name === title);

    if (title === "" || skillAdded) {
      return;
    }

    setSkills([
      ...skills,
      {
        id: Number(generateId()),
        name: title,
        rating: 5, // default skill level 5%
        createdAt: new Date(),
      },
    ]);
    setInputValue("");
    refetch();
  };
  const handleDeleteFromUser = (id: number) => () => {
    const elementToDeleteIndex = skills.findIndex(
      (position) => position.id === id
    );
    if (elementToDeleteIndex !== -1) {
      const newSkill = [...skills];
      newSkill.splice(elementToDeleteIndex, 1);
      setSkills(newSkill);
    }
    deleteSkillFromUser.mutate(
      {
        skillId: id,
      },
      {
        onSuccess: () => {
          toast({
            description: "Skill deleted form your list",
            variant: "success",
          });

          utils.users.getSkills.invalidate();
        },
      }
    );
  };

  const onCreateNewSkill = () => {
    createSkill.mutate(
      {
        name: inputValue,
      },
      {
        onSuccess: () => {
          toast({
            description: "New skill added to the list",
            variant: "success",
          });

          utils.users.getSkills.invalidate();
        },
      }
    );
  };

  const handleDeleteSkill = (id: number) => () => {
    deleteSkill.mutate(
      {
        skillId: id,
      },
      {
        onSuccess: () => {
          toast({
            description: "Skill deleted",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (!isUserSkillsLoading && userSkills) {
      setSkills(
        userSkills.map((skill: ISkill) => ({
          id: skill.id,
          name: skill.name,
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
    <div className="flex flex-col gap-2 border rounded p-2 mb-6 shadow-md">
      <div className="flex flex-col w-full mb-4">
        <div className="flex justify-between">
          <div className="flex gap-1 flex-wrap">
            {skills
              ? skills.map((skill) => {
                  return (
                    <div
                      key={generateId()}
                      className="flex justify-start items-center gap-2 w-fit mb-1 py-1 px-1 rounded bg-slate-200"
                    >
                      <p className="text-slate-500 text-sm">{skill.name}</p>
                      <p className="text-[0.5rem]">{skill.rating}%</p>
                      <button onClick={handleDeleteFromUser(skill.id)}>
                        <AiOutlineDelete size={16} className="text-[#a12064]" />
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <Autocomplete
        value={inputValue}
        onChange={handleOnChange}
        options={searchList}
        onClick={handleOnClick}
        onDelete={handleDeleteSkill}
      />

      <div className="flex gap-2 mb-4">
        <Button
          type="submit"
          className="py-0 h-7 rounded bg-blue-300 bg-smartgreen"
          onClick={onCreateNewSkill}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddSkill;
