import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

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
        <div className="flex gap-2 flex-wrap">
          {options
            ? options.map((option) => {
                return (
                  <div
                    key={generateId()}
                    className={cn(
                      "flex justify-start items-center gap-3 w-fit p-2 rounded bg-slate-200  text-slate-500",
                      selectedId === option.id ? "bg-[--smart-green]" : "",
                      isSelectable &&
                        "transition hover:bg-[--smart-green] hover:text-slate-800 hover:cursor-pointer"
                    )}
                    onClick={onSelect ? onSelect(option) : undefined}
                  >
                    <p
                      className={cn(
                        " text-sm",
                        selectedId === option.id ? "text-slate-800" : ""
                      )}
                    >
                      {option.name}
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
      </div>
    </div>
  );
};

export default TagList;
