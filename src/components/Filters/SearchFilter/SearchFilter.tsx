import { useRouter } from "next/router";
import React from "react";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "../../ui/input";
import { FILTERS } from "../utils/constans";

const SearchFilter = () => {
  const { query, pathname, replace } = useRouter();
  const searchQuery = query.search || "";

  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams(Object(query));

    if (value) {
      params.set(FILTERS.SEARCH, value);
    } else {
      params.delete(FILTERS.SEARCH);
    }

    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    debounced(value);
  };
  return (
    <div>
      <Input
        type="search"
        placeholder="Search by name, skill, project, position..."
        defaultValue={searchQuery as string}
        onChange={handleSetSearchQuery}
        className="text-base py-6"
        maxLength={50}
      />
    </div>
  );
};

export default SearchFilter;
