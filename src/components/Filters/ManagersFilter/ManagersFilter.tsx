import { useRouter } from "next/router";
import React from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/utils/trpc";

import { FILTERS } from "../utils/constans";
import FilterItemWrapper from "../utils/FilterItemWrapper";
import FilterWrapper from "../utils/FilterWrapper";

const ManagersFilter = () => {
  const { query, pathname, replace } = useRouter();
  const managers =
    typeof query?.managers === "string"
      ? (query?.managers?.split(",") as string[])
      : [];

  const { data: managersList } = trpc.users.getAllManagers.useQuery();

  const handleSetFilter = (val: string[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set(FILTERS.MANAGERS, valString);
    } else {
      params.delete(FILTERS.MANAGERS);
    }
    params.set(FILTERS.PAGE, "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterWrapper>
      <div>
        <ScrollArea className="w-full h-[225px] md:h-[225px]" type="always">
          {managersList &&
            managersList.map((item) => {
              if (!item.name) return null;
              return (
                <FilterItemWrapper key={item.id}>
                  <Checkbox
                    className="data-[state=checked]:bg-[--smart-purple] border-[--smart-purple]"
                    id={item.name}
                    value={item.name || ""}
                    checked={managers.includes(item.name)}
                    onCheckedChange={(checked) => {
                      if (!item.name) return;
                      return checked
                        ? handleSetFilter([...managers, item.name])
                        : handleSetFilter(
                            managers?.filter((value) => value !== item.name)
                          );
                    }}
                  />
                  <Label
                    className="cursor-pointer font-normal mt-[1px] leading-4"
                    htmlFor={item.name}
                  >
                    {item.name}
                  </Label>
                </FilterItemWrapper>
              );
            })}
        </ScrollArea>
      </div>
    </FilterWrapper>
  );
};

export default ManagersFilter;
