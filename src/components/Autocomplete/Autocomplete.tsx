import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";

import { Button } from "../ui/button";

interface Autocomplete {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (par1: string) => () => void;
  options: any[] | undefined;
  onDelete?: (id: number) => () => void | undefined;
}

const Autocomplete = ({
  value,
  onChange,
  onClick,
  options,
  onDelete,
}: Autocomplete) => {
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
              {options.map((option) => {
                return (
                  <div
                    key={option.id}
                    className="flex justify-between items-center hover:bg-slate-300"
                  >
                    <li
                      key={option.id}
                      className="px-2 py-1 m-0 flex items-center w-full hover:bg-slate-300 cursor-pointer"
                      onClick={onClick(option.name)}
                    >
                      <p className="m-0">{option.name}</p>
                    </li>
                    {onDelete && (
                      <Button
                        variant="link"
                        onClick={onDelete(option.id)}
                        className="focus:bg-accent focus:text-accent-foreground"
                      >
                        <AiOutlineDelete size={16} className="text-[#a12064]" />
                      </Button>
                    )}
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
