import { UserSkill } from "@prisma/client";
import React, { useState } from "react";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import TagList from "@/components/TagList/TagList";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
        description: `${name} is already in your list.`,
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
            description: `${name} added to your list.`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };
  const handleDeleteFromUser =
    (userSkillId: number | string, name: string) => () => {
      deleteSkillFromUser.mutate(
        {
          userSkillId: Number(userSkillId),
        },
        {
          onSuccess: () => {
            toast({
              description: `${name} deleted form your list.`,
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
        description:
          "Please enter a skill name in the input field before saving.",
        variant: "destructive",
      });
      return;
    }
    createSkill.mutate(
      {
        name: inputValue.trim(),
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${inputValue} created and added to your list.`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
        },
        onError: (error) => {
          toast({
            description:
              error?.data?.zodError?.fieldErrors &&
              error?.data?.zodError?.fieldErrors.name
                ? error.data?.zodError?.fieldErrors.name[0]
                : "Something went wrong.",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (userSkills == null) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 border rounded p-2 mb-6 shadow-md">
      <TagList options={userSkills} onDelete={handleDeleteFromUser} />

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
