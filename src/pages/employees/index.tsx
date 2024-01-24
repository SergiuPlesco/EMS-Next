import { Availability } from "@prisma/client";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";

import AvailabilityFilter from "@/components/Filters/AvailabilityFilter/AvailabilityFilter";
import Pagination from "@/components/Pagination/Pagination";
import { Input } from "@/components/ui/input";
import UserCard from "@/components/UserCard/UserCard";
import UserSkeleton from "@/components/UserSkeleton/UserSkeleton";
import { trpc } from "@/utils/trpc";

const EmployeesPage = () => {
  const { query, pathname, replace } = useRouter();
  const searchQuery = query.search || "";
  const currentPage = Number(query.page) || 1;
  const availability =
    typeof query?.availability === "string"
      ? (query?.availability?.split(",") as Availability[])
      : [];

  const { data, isLoading, isFetching } = trpc.users.filter.useQuery({
    searchQuery: searchQuery as string,
    page: currentPage,
    perPage: 24,
    availability,
  });

  const debounced = useDebouncedCallback((value) => {
    const params = new URLSearchParams(Object(query));

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    debounced(value);
  };

  const handleSetCurrentPage = (val: number) => {
    const params = new URLSearchParams(Object(query));
    params.set("page", val.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSetAvailability = (val: Availability[]) => {
    const valString = val.join(",");
    const params = new URLSearchParams(Object(query));

    if (valString) {
      params.set("availability", valString);
    } else {
      params.delete("availability");
    }
    params.set("page", "1");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Input
          type="search"
          placeholder="Search by name, skill, project, position..."
          defaultValue={searchQuery as string}
          onChange={handleSetSearchQuery}
          className="text-base"
          maxLength={50}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,200px),1fr] gap-10">
        <AvailabilityFilter
          availability={availability}
          setAvailability={handleSetAvailability}
        />
        <div className="flex flex-col justify-center items-center gap-5">
          {isLoading || isFetching ? (
            <UserSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {data &&
                  data.users.length > 0 &&
                  data.users.map((user) => {
                    return <UserCard key={user.id} user={user} />;
                  })}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={data?.pagination.totalPages || 0}
                onChange={handleSetCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
