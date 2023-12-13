import { DotsVerticalIcon,PlusIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React from "react";

import CreateProject from "@/components/forms/CreateProject/CreateProject";
import Modal from "@/components/Modal/Modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

const Projects = () => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const { data: userProjects } = trpc.projects.getAll.useQuery();
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
          utils.projects.getAll.invalidate();
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
  return (
    <>
      <div className="flex justify-end items-center">
        <Modal
          title="Projects"
          description="Add a new project."
          icon={<PlusIcon width={16} color="var(--smart-purple)" />}
          text={"Add/Remove Projects"}
        >
          <CreateProject />
        </Modal>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {userProjects &&
          userProjects.length > 0 &&
          userProjects.map((project) => {
            return (
              <div
                key={project.id}
                className="flex flex-col gap-2 border rounded p-4"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium text-[--smart-purple]">
                    {project.name}
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <DotsVerticalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-500"
                        onClick={handleDeleteProject(project.id, project.name)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
