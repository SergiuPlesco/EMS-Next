import Image from "next/image";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import Pagination from "@/components/Pagination/Pagination";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc";

const EmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = trpc.users.filter.useQuery({
    searchQuery,
    page: currentPage,
    perPage: 12,
  });

  const debounced = useDebouncedCallback(
    (value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    },

    1000
  );

  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounced(e.target.value);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Input
          type="search"
          placeholder="Search by name, skill, project, position..."
          defaultValue={searchQuery}
          onChange={handleSetSearchQuery}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,200px),1fr] gap-10">
        <div>filters</div>
        <div className="flex flex-col justify-center items-center gap-5">
          {isLoading || isFetching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {Array(12)
                .fill("skeleton")
                .map((_, index) => {
                  return (
                    <div
                      key={index}
                      className="animate-pulse rounded-md bg-primary/10 shadow-md border"
                    >
                      <div className="rounded-md min-w-full min-h-[226px]"></div>
                      <div className="rounded-b-md p-3 bg-white">
                        <p className="animate-pulse bg-primary/10 h-2 mb-2 font-extrabold"></p>
                        <div className="flex flex-col">
                          <span className="animate-pulse bg-primary/10 text-xs h-1 text-slate-500 mb-1"></span>
                          <span className="animate-pulse bg-primary/10 text-xs h-1 text-slate-500"></span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {data &&
                  data.users.length > 0 &&
                  data.users.map((user) => {
                    return (
                      <div
                        key={user.id}
                        className="rounded-md shadow-md border w-full"
                      >
                        <div className="rounded-md">
                          <Image
                            src={user.image || ""}
                            alt="profile image"
                            width="200"
                            height="250"
                            quality={100}
                            className="w-full h-full rounded-t-md "
                          />
                        </div>
                        <div className="rounded-b-md p-3 bg-white">
                          <p className="font-extrabold">{user.name}</p>
                          <div className="flex flex-col">
                            {user.positions.map((position) => {
                              return (
                                <span
                                  key={position.id}
                                  className="text-xs text-slate-500"
                                >
                                  {position.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <Pagination
                page={currentPage}
                count={data?.pagination.totalPages || 0}
                onChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
