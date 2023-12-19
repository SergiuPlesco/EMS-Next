import React from "react";

const UserSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
      {Array(12)
        .fill("skeleton")
        .map((_, index) => {
          return (
            <div
              key={index}
              className="animate-pulse rounded-md bg-primary/10 shadow-md border"
            >
              <div className="rounded-md min-w-full h-[150px]"></div>
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
  );
};

export default UserSkeleton;
