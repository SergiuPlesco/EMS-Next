import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
interface Autocomplete {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (par1: string) => () => void;
  options: any[] | undefined;
}

const Autocomplete = ({ value, onChange, onClick, options }: Autocomplete) => {
  const { toast } = useToast();
  const deleteSkill = trpc.skills.delete.useMutation();

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
  return (
    <div className="flex flex-col gap-2 items-start w-full relative">
      <div className="relative w-full">
        <span className="absolute top-3 left-0 pl-2 flex items-center pointer-envents-none">
          <AiOutlineSearch />
        </span>
        <input
          type="search"
          className={`border rounded p-2 pl-8 text-sm w-full text-slate-900 focus:border-slate-500 outline-0`}
          placeholder="Search a skill..."
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="absolute top-[100%] w-full bg-[#ffffff]">
        {options && options.length ? (
          <div className="border w-full h-full rounded mt-1">
            <ul>
              {options.map((skill) => {
                return (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center hover:bg-slate-300"
                  >
                    <li
                      key={skill.id}
                      className="px-2 py-1 m-0 flex items-center w-full hover:bg-slate-300 cursor-pointer"
                      onClick={onClick(skill.title)}
                    >
                      <p className="m-0">{skill.title}</p>
                    </li>
                    <Button
                      variant="link"
                      onClick={handleDeleteSkill(skill.id)}
                      className="focus:bg-accent focus:text-accent-foreground"
                    >
                      <AiOutlineDelete size={16} className="text-[#a12064]" />
                    </Button>
                  </div>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Autocomplete;
