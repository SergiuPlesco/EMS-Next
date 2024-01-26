import { DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { FILTERS } from "@/components/Filters/utils/constans";
import CreateProject from "@/components/forms/CreateProject/CreateProject";
import EditProject from "@/components/forms/EditProject/EditProject";
import Modal from "@/components/Modal/Modal";
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
import { useToast } from "@/components/ui/use-toast";
import { ENDPOINTS } from "@/constants/common";
import { TUser } from "@/typeDefinitions/typeDefinitions";
import { trpc } from "@/utils/trpc";

const Projects = ({
  user,
  isLoggedUser,
}: {
  user: TUser;
  isLoggedUser: boolean;
}) => {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const { query } = useRouter();

  const userProjects = user.projects;
  const deleteProject = trpc.users.deleteProject.useMutation();

  const handleDeleteProject = (id: number, name: string) => () => {
    deleteProject.mutate(
      {
        id,
      },
      {
        onSuccess: () => {
          toast({
            description: `${name} has been removed.`,
            variant: "success",
          });
          utils.projects.all.invalidate();
          utils.users.getLoggedUser.invalidate();
        },
        onError(error) {
          toast({
            description: `${error.message}`,
            variant: "destructive",
          });
        },
      }
    );
  };
  const createProjectURL = (projectName: string) => {
    const params = new URLSearchParams(Object(query));
    params.set(FILTERS.PAGE, "1");
    params.set(FILTERS.PROJECTS, projectName);
    return `${ENDPOINTS.employees}/?${params.toString()}`;
  };

  if (!userProjects) {
    return null;
  }

  const hasUserProjects = userProjects.length > 0;

  return (
    <>
      <div className="flex items-center gap-2 mb-1">
        {(isLoggedUser || (!isLoggedUser && hasUserProjects)) && (
          <p className="font-medium text-xl text-[--smart-green]">Projects</p>
        )}
        {isLoggedUser && (
          <Modal
            title="Projects"
            description="Search, add, or create new projects."
            icon={
              <PlusIcon width={20} height={20} color="var(--smart-purple)" />
            }
          >
            <CreateProject />
          </Modal>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hasUserProjects &&
          userProjects.map((project) => {
            return (
              <div
                key={project.id}
                className="flex flex-col gap-2 border rounded p-4 shadow-md"
              >
                <div className="flex justify-between items-start">
                  <Link
                    href={createProjectURL(project.name)}
                    className="text-lg font-medium text-[--smart-purple]"
                  >
                    {project.name}
                  </Link>
                  {isLoggedUser && (
                    <Dialog>
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <DotsVerticalIcon className="text-slate-600 mt-2" />
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
                                <p>Delete {`${project.name}`}</p>
                              </AlertDialogTrigger>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Projects</DialogTitle>
                            <DialogDescription>Edit project.</DialogDescription>
                          </DialogHeader>
                          <EditProject projectId={project.projectId} />
                        </DialogContent>

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
                              onClick={handleDeleteProject(
                                project.id,
                                project.name
                              )}
                              className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </Dialog>
                  )}
                </div>
                <div className="flex justify-start items-center gap-1">
                  <p className="text-xs text-slate-500">
                    {project.startDate
                      ? format(project.startDate, "MMMM, yyyy")
                      : ""}
                  </p>
                  {"-"}
                  <p className="text-xs text-slate-500">
                    {project.endDate
                      ? format(project.endDate, "MMMM, yyyy")
                      : "present"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Projects;
