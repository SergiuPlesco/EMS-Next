import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

import { TagItemProps } from "@/typeDefinitions/typeDefinitions";
import generateId from "@/utils/generateId";

import { Button } from "../ui/button";

const TagItem = ({ option, onDelete }: TagItemProps) => {
  return (
    <div
      key={generateId()}
      className="flex justify-start items-center gap-3 w-fit p-2 rounded bg-slate-200"
    >
      <p className="text-slate-500 text-sm">{option.name}</p>

      <Button
        variant="ghost"
        className="p-1 h-6"
        onClick={onDelete(option.id, option.name!)}
      >
        <Cross2Icon className="text-[#a12064]" />
      </Button>
    </div>
  );
};

export default TagItem;
