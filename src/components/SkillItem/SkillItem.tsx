import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

export type IUserSkill = {
  name: string;
  id: number;
  rating: number | null;
  userId: string | null;
};

type SkillItemProps = { skill: IUserSkill; isLoggedUser: boolean };

const SkillItem = ({ skill, isLoggedUser }: SkillItemProps) => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const [rangeValue, setRangeValue] = useState<number>(skill.rating || 5);

  const updateSkillRating = trpc.users.updateRating.useMutation();
  const deleteSkillFromUser = trpc.users.deleteSkill.useMutation();

  const handleChange = useDebouncedCallback((value: number[]) => {
    setRangeValue(Number(value[0]));
    updateSkillRating.mutate(
      {
        skillId: skill.id,
        rating: Number(value[0]),
      },
      {
        onSuccess: () => {
          toast({
            description: `${skill.name} rating has been updated`,
            variant: "success",
          });
          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  }, 200);

  const handleDeleteFromUser = (userSkillId: number, name: string) => () => {
    deleteSkillFromUser.mutate(
      {
        userSkillId,
      },
      {
        onSuccess: () => {
          toast({
            description: `${name} deleted form your list`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
        },
      }
    );
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between mb-2">
        <p className="font-medium text-slate-700">{skill.name}</p>

        <div className="flex items-center gap-4">
          <p className="font-medium text-slate-700">{rangeValue}%</p>
          {isLoggedUser && (
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <DotsVerticalIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <DialogTrigger className="w-full text-md font-medium text-slate-500">
                      Edit
                    </DialogTrigger>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleDeleteFromUser(skill.id, skill.name)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Skill</DialogTitle>
                  <DialogDescription>Edit skill.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-between mb-2">
                  <p className="font-medium text-slate-700">{skill.name}</p>
                  <p className="font-medium text-slate-700">{rangeValue}%</p>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[rangeValue]}
                  onValueChange={handleChange}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Slider
        min={0}
        max={100}
        step={5}
        value={[rangeValue]}
        onValueChange={handleChange}
        disabled={true}
      />
    </div>
  );
};

export default SkillItem;
