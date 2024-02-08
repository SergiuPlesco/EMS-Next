import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Autocomplete {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelect: (name: string) => void;
  options: any[] | undefined;
  onDelete?: (id: number, name: string) => () => void | undefined;
  placeholder?: string;
  onEnter?: () => void;
}

const Autocomplete = ({
  value,
  onChange,
  onSelect,
  options,
  onDelete,
  placeholder = "Search or create a new one...",
  onEnter,
}: Autocomplete) => {
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onEnter && e.code === "Enter") {
      onEnter();
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full relative">
      <div className="relative w-full">
        <span className="absolute top-[50%] translate-y-[-50%] pl-2 flex items-center opacity-50 pointer-envents-none">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </span>
        <Input
          type="search"
          className={`border rounded p-2 pl-8 h-10 text-base w-full text-slate-900 focus:border-slate-500  placeholder:text-slate-400`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={handleOnKeyDown}
          maxLength={50}
        />
      </div>
      {/* absolute top-[100%] */}
      <div className="mt-1 rounded w-full bg-[#ffffff]">
        {options && options.length ? (
          <div className="border w-full rounded mt-1 shadow-lg">
            <ScrollArea
              type="scroll"
              className={cn("h-auto", options.length >= 7 ? "h-[300px]" : "")}
            >
              <ul className="flex flex-col gap-1 m-1 p-2">
                {options.map((option) => {
                  return (
                    <div
                      key={option.id}
                      className="flex justify-between items-center border-transparend rounded bg-slate-200 hover:bg-slate-300"
                    >
                      <li
                        key={option.id}
                        className="px-2 py-2 m-0 flex items-center w-full rounded hover:bg-slate-300 cursor-pointer"
                        onClick={() => onSelect(option.name)}
                      >
                        <p className="m-0">{option.name}</p>
                      </li>
                      {onDelete && (
                        <Button
                          variant="link"
                          onClick={onDelete(option.id, option.name)}
                          className="focus:bg-accent focus:text-accent-foreground"
                        >
                          <AiOutlineDelete
                            size={16}
                            className="text-[#a12064]"
                          />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </ul>
            </ScrollArea>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Autocomplete;
