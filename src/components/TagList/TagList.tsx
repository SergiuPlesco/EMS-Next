import { UserSkill } from "@prisma/client";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TagListProps } from "@/typeDefinitions/typeDefinitions";
import generateId from "@/utils/generateId";

import { Button } from "../ui/button";

const TagList = ({
  options,
  onDelete,
  onSelect,
  selectedId,
  isSelectable,
}: TagListProps) => {
  return (
    <div className="flex flex-col w-full mb-4">
      <div className="flex justify-between">
        <ScrollArea
          type="always"
          className="max-h-[200px] md:max-h-[400px] lg:max-h-[500px]"
        >
          <div className="flex gap-2 flex-wrap pr-4">
            {options
              ? options.map((option) => {
                  return (
                    <div
                      key={generateId()}
                      className={cn(
                        "flex justify-start items-center gap-3 w-fit p-1 pl-2 rounded bg-slate-200  text-slate-500",
                        selectedId === option.id
                          ? "bg-[--smart-green] text-slate-800"
                          : "",
                        isSelectable &&
                          "transition hover:bg-[--smart-green] hover:text-slate-800 hover:cursor-pointer",
                      )}
                      onClick={onSelect ? onSelect(option) : undefined}
                    >
                      <p className="text-xs md:text-sm">{option.name}</p>
                      <p className="text-xs">
                        {isUserSkill(option) && ` ${option.rating}%`}
                      </p>

                      <Button
                        variant="ghost"
                        className="p-1 h-6"
                        onClick={onDelete(option.id, option.name!)}
                      >
                        <Cross2Icon className="text-[#a12064]" />
                      </Button>
                    </div>
                  );
                })
              : null}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const isUserSkill = (obj: any): obj is UserSkill => {
  return "rating" in obj;
};
export default TagList;
