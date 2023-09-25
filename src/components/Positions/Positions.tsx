import React from "react";

import { trpc } from "@/utils/trpc";
const Positions = () => {
  const { data: userPositions } = trpc.users.getPositions.useQuery();
  return (
    <div className="flex flex-col">
      <p className="text-slate-500 text-sm">Positions</p>
      {userPositions ? (
        userPositions.map((position) => {
          return (
            <h3 key={position.id} className="font-semibold text-slate-600">
              {position.title}
            </h3>
          );
        })
      ) : (
        <p>no position yet</p>
      )}
    </div>
  );
};

export default Positions;
