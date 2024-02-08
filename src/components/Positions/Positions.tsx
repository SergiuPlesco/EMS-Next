import { Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import AddPosition from "@/components/forms/AddPosition/AddPosition";
import { ENDPOINTS } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";

import { FILTERS } from "../Filters/utils/constans";
import Modal from "../Modal/Modal";

const Positions = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const { query } = useRouter();
  const userPositions = user.positions;

  const createPositionURL = (positionName: string) => {
    const params = new URLSearchParams(Object(query));
    params.set(FILTERS.PAGE, "1");
    params.set(FILTERS.POSITIONS, positionName);
    params.delete("id");
    return `${ENDPOINTS.employees}/?${params.toString()}`;
  };

  if (!userPositions) {
    return null;
  }

  const hasUserPositions = userPositions.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center gap-2">
        {isLoggedUser && (
          <Modal
            title="Positions"
            description={
              <span className="block">
                Search, select, remove, or create new positions.
              </span>
            }
            icon={
              hasUserPositions ? (
                <Pencil1Icon width={16} color="var(--smart-purple)" />
              ) : (
                <PlusIcon width={16} color="var(--smart-purple)" />
              )
            }
            text={
              <p className="text-[12px] font-normal text-slate-500">
                Positions
              </p>
            }
          >
            <AddPosition userPositions={userPositions} />
          </Modal>
        )}
        {!isLoggedUser && (
          <p className="text-[12px] font-normal text-slate-500">Positions</p>
        )}
      </div>
      {hasUserPositions ? (
        userPositions.map((position) => {
          return (
            <Link key={position.id} href={createPositionURL(position.name)}>
              <h3 className="font-semibold text-slate-600">{position.name}</h3>
            </Link>
          );
        })
      ) : (
        <p className="font-semibold text-slate-300">
          Positions have not been added yet
        </p>
      )}
    </div>
  );
};

export default Positions;
