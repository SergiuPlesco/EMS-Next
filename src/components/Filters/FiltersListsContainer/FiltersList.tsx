import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  filterName: string;
};

const FilterList = ({ filterName }: Props) => {
  const { query, replace, pathname } = useRouter();

  const selectedFilters: string[] =
    typeof query[filterName] === "string"
      ? ((query[filterName] as string)?.split(",") as string[])
      : [];

  const removeFilter = (item: string) => () => {
    const params = new URLSearchParams(Object(query));
    const filteredItems = selectedFilters.filter((filter) => filter !== item);
    const filteredItemsString = filteredItems.join(",");
    if (filteredItemsString) {
      params.set(filterName, filteredItemsString);
    } else {
      params.delete(filterName);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  if (selectedFilters.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {selectedFilters.map((item) => {
        return (
          <Badge
            key={item}
            className="text-[--smart-purple] gap-2 bg-white hover:bg-slate-100 border-[--smart-purple]  rounded"
          >
            {item}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 hover:bg-white"
              onClick={removeFilter(item)}
            >
              <Cross2Icon className="text-[--smart-purple]" />
            </Button>
          </Badge>
        );
      })}
    </div>
  );
};

export default FilterList;
