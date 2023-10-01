import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

import { Input } from "../ui/input";

interface Autocomplete {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (par1: string) => () => void;
  options: any[] | undefined;
}

const Autocomplete = ({ value, onChange, onClick, options }: Autocomplete) => {
  return (
    <>
      <span className="absolute top-3 left-0 pl-2 flex items-center pointer-envents-none">
        <AiOutlineSearch />
      </span>
      <Input
        type="search"
        className={`border rounded p-2 pl-8 text-sm w-full text-slate-900 focus:border-slate-500 outline-0`}
        placeholder="Search a skill..."
        value={value}
        onChange={onChange}
      />
      {options && options.length ? (
        <div className="border w-full h-full rounded mt-1">
          <ul>
            {options.map((skill) => {
              return (
                <li
                  key={skill.id}
                  className="px-2 py-1 m-0 flex items-center hover:bg-slate-300 cursor-pointer"
                  onClick={onClick(skill.title)}
                >
                  <p className="m-0">{skill.title}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default Autocomplete;
