import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

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

  const { data: searchList } = trpc.skills.search.useQuery({
    searchQuery: inputValue,
  });

  const { data: userSkills, isLoading: isUserSkillsLoading } =
    trpc.users.getSkills.useQuery();

  const createSkill = trpc.skills.create.useMutation();
  const deleteSkill = trpc.skills.delete.useMutation();
  const deleteSkillFromUser = trpc.users.deleteSkill.useMutation();
  const addSkillToUser = trpc.users.addSKill.useMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleOnSelect = (name: string) => () => {
    const skillAdded = skills?.find((skill) => skill.name === name);

    if (name === "" || skillAdded) {
      toast({
        description: `${name} is already in your list`,
        variant: "destructive",
      });
      return;
    }

    setSkills([
      ...skills,
      {
        id: Number(generateId()),
        name,
        rating: 5, // default skill level 5%
        createdAt: new Date(),
      },
    ]);
    addSkillToUser.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} added to your list`,
            variant: "success",
          });

          utils.users.getSkills.invalidate();
        },
      }
    );
  };
  const handleDeleteFromUser = (id: number, name: string) => () => {
    deleteSkillFromUser.mutate(
      {
        skillId: id,
      },
      {
        onSuccess: () => {
          toast({
            description: `${name} deleted form your list`,
            variant: "success",
          });

          utils.users.getSkills.invalidate();
        },
      }
    );
  };

  const handleCreateNewSkill = () => {
    if (!inputValue) {
      toast({
        description: "What are you adding?",
        variant: "destructive",
      });
      return;
    }
    createSkill.mutate(
      {
        name: inputValue,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${inputValue} added to the list`,
            variant: "success",
          });

          utils.users.getSkills.invalidate();
        },
      }
    );
  };

  const handleDeleteSkillFromList = (id: number, name: string) => () => {
    deleteSkill.mutate(
      {
        skillId: id,
        name,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} is deleted form the list`,
            variant: "success",
          });
          utils.skills.search.invalidate();
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
                      <button
                        onClick={handleDeleteFromUser(skill.id, skill.name)}
                      >
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
        onSelect={handleOnSelect}
        onDelete={handleDeleteSkillFromList}
        onEnter={handleCreateNewSkill}
      />

      <div className="flex gap-2 mb-4">
        <Button
          type="submit"
          className="py-0 h-7 rounded bg-blue-300 bg-smartgreen"
          onClick={handleCreateNewSkill}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddSkill;
