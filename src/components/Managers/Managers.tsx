import React from "react";

import { trpc } from "@/utils/trpc";

const Managers = () => {
  const { data: managers } = trpc.users.getManagers.useQuery();

  if (!managers) {
    return null;
  }
  return (
    <div className="flex flex-col">
      <p className="text-slate-500 text-sm">Managers</p>
      {managers ? (
        managers.managers.map((manager) => {
          return (
            <h3 key={manager.id} className="font-semibold text-slate-600">
              {manager.name}
            </h3>
          );
        })
      ) : (
        <p>No position yet</p>
      )}
    </div>
  );
};

export default Managers;
