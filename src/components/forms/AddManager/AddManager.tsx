import { useEffect, useState } from "react";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import TagList from "@/components/TagList/TagList";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

const AddManager = () => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const [inputValue, setInputValue] = useState("");
  const [managers, setManagers] = useState<{ id: string; name: string }[]>([]);

  const { data: searchList } = trpc.users.search.useQuery({
    searchQuery: inputValue,
  });
  const { data: userManagers, isLoading: isUserManagersLoading } =
    trpc.users.getManagers.useQuery();

  const addManager = trpc.users.addManager.useMutation();
  const deleteManager = trpc.users.deleteManager.useMutation();

  const handleOnSelect = (name: string) => {
    addManager.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} added as your manager.`,
            variant: "success",
          });
          utils.users.getManagers.invalidate();
          utils.users.getLoggedUser.invalidate();
        },
        onError: () => {
          toast({
            description: "Error occured when adding a manager.",
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
      const elementToDeleteIndex = managers.findIndex(
        (position) => position.id === id
      );
      if (elementToDeleteIndex !== -1) {
        const newManagers = [...managers];
        newManagers.splice(elementToDeleteIndex, 1);
        setManagers(newManagers);
      }
      if (name == null) return;
      deleteManager.mutate(
        {
          name,
        },
        {
          onSuccess: () => {
            toast({
              description: `${name} has been deleted from your managers.`,
              variant: "success",
            });
            utils.users.getManagers.invalidate();
            utils.users.getLoggedUser.invalidate();
          },
        }
      );
    };

  useEffect(() => {
    !isUserManagersLoading &&
      userManagers &&
      setManagers(
        userManagers.managers.map((user) => ({
          id: user.id,
          name: user.name!,
        }))
      );
  }, [isUserManagersLoading, userManagers]);

  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <TagList options={managers} onDelete={handleDeleteFromUser} />
      <Autocomplete
        value={inputValue}
        onChange={handleOnChange}
        options={searchList}
        onSelect={handleOnSelect}
      />
    </div>
  );
};

export default AddManager;
