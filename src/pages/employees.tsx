import Image from "next/image";
import { useState } from "react";

import Spinner from "@/components/Spinner/Spinner";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc";
const EmployeesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // const { data: users, isLoading } = trpc.users.all.useQuery();
  const { data: filteredUsers, isLoading } = trpc.users.filter.useQuery({
    searchQuery,
  });
  const handleSetSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Input
          placeholder="Search by name, skill, project, position..."
          value={searchQuery}
          onChange={handleSetSearchQuery}
        />
      </div>
      <div className="flex justify-between gap-10">
        <div>filters</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {isLoading ? (
            <Spinner />
          ) : (
            filteredUsers &&
            filteredUsers.length > 0 &&
            filteredUsers.map((user) => {
              return (
                <div key={user.id} className="rounded-md shadow-md border">
                  <div className="rounded-md">
                    <Image
                      src={user.image || ""}
                      alt="profile image"
                      width="1000"
                      height="1500"
                      quality={100}
                      className="w-full h-full rounded-t-md"
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
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
