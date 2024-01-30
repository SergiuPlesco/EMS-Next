import { User } from "@prisma/client";
import { useState } from "react";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import TagList from "@/components/TagList/TagList";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

const AddTeamMember = ({ teamMembers }: { teamMembers: User[] }) => {
  const { toast } = useToast();
  const utils = trpc.useUtils();
  const [inputValue, setInputValue] = useState("");

  const { data: searchList } = trpc.users.search.useQuery({
    searchQuery: inputValue,
  });

  const addTeamMember = trpc.users.addTeamMember.useMutation();
  const deleteTeamMember = trpc.users.deleteTeamMember.useMutation();

  const handleOnSelect = (name: string) => {
    addTeamMember.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} added as your team member.`,
            variant: "success",
          });

          utils.users.getLoggedUser.invalidate();
        },
        onError: () => {
          toast({
            description: "Error occured when adding a team member.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleDeleteFromUser =
    (id: number | string, name: string | null) => () => {
      if (name == null) return;

      deleteTeamMember.mutate(
        {
          userId: id.toString(),
        },
        {
          onSuccess: () => {
            toast({
              description: `${name} has been deleted from your team.`,
              variant: "success",
            });

            utils.users.getLoggedUser.invalidate();
          },
        }
      );
    };

  if (!teamMembers) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <TagList options={teamMembers} onDelete={handleDeleteFromUser} />
      <Autocomplete
        value={inputValue}
        onChange={handleOnChange}
        options={searchList}
        onSelect={handleOnSelect}
      />
    </div>
  );
};

export default AddTeamMember;
