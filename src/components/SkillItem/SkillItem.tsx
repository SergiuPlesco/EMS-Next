import { UserSkill } from "@prisma/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { ENDPOINTS } from "@/constants/common";
import { trpc } from "@/utils/trpc";

import { FILTERS } from "../Filters/utils/constans";
import EditRating from "../forms/EditRating/EditRating";

type SkillItemProps = { skill: UserSkill; isLoggedUser: boolean };

const SkillItem = ({ skill, isLoggedUser }: SkillItemProps) => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const { query } = useRouter();

  const deleteSkillFromUser = trpc.users.deleteSkill.useMutation();

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

  const createSkillURL = (skillName: string) => {
    const params = new URLSearchParams(Object(query));
    params.set(FILTERS.PAGE, "1");
    params.set(FILTERS.SKILLS, skillName);
    return `${ENDPOINTS.employees}/?${params.toString()}`;
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="flex justify-between items-start gap-2 mb-2">
        <Link
          href={createSkillURL(skill.name)}
          className="font-medium text-slate-700"
        >
          {skill.name}
        </Link>

        <div className="flex items-center gap-4">
          <p className="font-medium text-slate-700">{skill.rating}%</p>
          {isLoggedUser && (
            <Dialog>
              <AlertDialog>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <DotsVerticalIcon className="text-slate-600" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60 mr-2">
                    <DropdownMenuItem asChild>
                      <DialogTrigger className="w-full text-md font-medium text-slate-500">
                        Edit
                      </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-red-500" asChild>
                      <AlertDialogTrigger asChild>
                        <p>Delete {`${skill.name}`}</p>
                      </AlertDialogTrigger>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteFromUser(skill.id, skill.name)}
                      className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Skill</DialogTitle>
                    <DialogDescription>
                      Edit skill knowledge level.
                    </DialogDescription>
                  </DialogHeader>

                  <EditRating skill={skill} />
                </DialogContent>
              </AlertDialog>
            </Dialog>
          )}
        </div>
      </div>

      <Slider
        min={0}
        max={100}
        step={5}
        value={[skill.rating]}
        disabled={true}
      />
    </div>
  );
};

export default SkillItem;
