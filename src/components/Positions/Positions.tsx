import React from "react";

import { trpc } from "@/utils/trpc";

import Spinner from "../Spinner/Spinner";
const Positions = () => {
  const { data: userPositions, isLoading } = trpc.users.getPositions.useQuery();
  if (isLoading && !userPositions) {
    return <Spinner />;
  }
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
        <p>No position yet</p>
      )}
    </div>
  );
};

export default Positions;
