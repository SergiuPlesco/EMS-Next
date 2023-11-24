import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

import Autocomplete from "../Autocomplete/Autocomplete";

const AddManager = () => {
  const { toast } = useToast();
  const utils = trpc.useContext();
  const [inputValue, setInputValue] = useState("");
  const [managers, setManagers] = useState<
    { id: string; name: string | null }[]
  >([]);

  const { data: searchList } = trpc.users.search.useQuery({
    searchQuery: inputValue,
  });
  const { data: userManagers, isLoading: isUserManagersLoading } =
    trpc.users.getManagers.useQuery();

  const addManager = trpc.users.addManager.useMutation();
  const deleteManager = trpc.users.deleteManager.useMutation();

  const handleOnSelect = (name: string) => () => {
    addManager.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          setInputValue("");
          toast({
            description: `${name} added as your manager`,
            variant: "success",
          });
          utils.users.getManagers.invalidate();
        },
        onError: () => {
          toast({
            description: "Error occured when adding a manager",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const positionAdded = managers?.find((position) => position.id === value);

    // if (value === "" || positionAdded) {
    //   return; // Exit early if the value is empty or the position is already added
    // }

    // const manager = userList?.find((manager) => manager.id === value);
    // if (!manager) return;

    // setManagers([...managers, { id: manager.id, name: manager.name }]);
    const value = e.target.value;
    setInputValue(value);
  };

  const handleDeleteFromUser = (id: string, name: string | null) => () => {
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
            description: `${name} has been deleted from your managers`,
            variant: "success",
          });
          utils.users.getManagers.invalidate();
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
          name: user.name,
        }))
      );
  }, [isUserManagersLoading, userManagers]);

  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-1 flex-wrap">
            {managers
              ? managers.map((manager: { id: string; name: string | null }) => {
                  return (
                    <div
                      key={manager.id}
                      className="flex justify-start w-fit mb-1 py-1 px-1 rounded bg-slate-200"
                    >
                      <p className="text-slate-500 pr-4 text-sm">
                        {manager.name}
                      </p>
                      <button
                        onClick={handleDeleteFromUser(manager.id, manager.name)}
                      >
                        <AiOutlineDelete size={16} className="text-[#a12064]" />
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
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
