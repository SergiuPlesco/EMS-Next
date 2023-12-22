import { UserSkill } from "@prisma/client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

const AddSkill = ({ userSkills }: { userSkills: UserSkill[] }) => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");

  const utils = trpc.useContext();

  const { data: searchList } = trpc.skills.search.useQuery({
    searchQuery: inputValue,
  });

  const createSkill = trpc.skills.create.useMutation();
  const deleteSkillFromUser = trpc.users.deleteSkill.useMutation();
  const addSkillToUser = trpc.users.addSKill.useMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleOnSelect = (name: string) => {
    const skillAdded = userSkills?.find((skill) => skill.name === name);

    if (name === "" || skillAdded) {
      toast({
        description: `${name} is already in your list`,
        variant: "destructive",
      });
      return;
    }

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

          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };
  const handleDeleteFromUser = (userSkillId: number, name: string) => () => {
    deleteSkillFromUser.mutate(
      {
        userSkillId,
      },
      {
        onSuccess: () => {
          toast({
            description: `${name} deleted form your list`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
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

          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };

  if (userSkills == null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border rounded p-2 mb-6 shadow-md">
      <div className="flex flex-col w-full mb-4">
        <div className="flex justify-between">
          <div className="flex gap-2 flex-wrap">
            {userSkills
              ? userSkills.map((skill) => {
                  return (
                    <div
                      key={generateId()}
                      className="flex justify-start items-center gap-3 w-fit p-2 rounded bg-slate-200"
                    >
                      <p className="text-slate-500 text-sm">{skill.name}</p>

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
        onEnter={handleCreateNewSkill}
      />

      <div className="flex justify-end gap-2 mb-4">
        <Button
          type="button"
          className="mt-2 py-0 h-7 rounded bg-blue-300 bg-smartpurple"
          onClick={handleCreateNewSkill}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddSkill;
