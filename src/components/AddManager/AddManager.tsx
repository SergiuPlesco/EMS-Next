import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";

const ManagerSchema = z.object({
  managerId: z.string(),
});

const AddManager = () => {
  const { toast } = useToast();

  const [managers, setManagers] = useState<
    { id: string; name: string | null }[]
  >([]);

  const { data: userList } = trpc.users.all.useQuery();
  const {
    data: userManagers,
    isLoading: isUserManagersLoading,
    refetch: refetchUserManagersList,
  } = trpc.users.getManagers.useQuery();
  const addManager = trpc.users.updateManagers.useMutation();

  const managersForm = useForm<z.infer<typeof ManagerSchema>>({
    resolver: zodResolver(ManagerSchema),
    defaultValues: {
      managerId: "",
    },
  });

  const handleAddManager = () => {
    addManager.mutate(
      {
        managerIds: managers.map((manager) => ({ id: manager.id })),
      },
      {
        onSuccess: () => {
          refetchUserManagersList();
          toast({
            description: "Managers list updated",
            variant: "success",
          });
        },
        onError: () => {
          refetchUserManagersList();
          toast({
            description: "Error occured when adding a manager",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleChange = (value: string) => {
    const positionAdded = managers?.find((position) => position.id === value);

    if (value === "" || positionAdded) {
      return; // Exit early if the value is empty or the position is already added
    }

    const manager = userList?.find((manager) => manager.id === value);
    if (!manager) return;

    setManagers([...managers, { id: manager.id, name: manager.name }]);
  };

  const handleDelete = (id: number | string) => () => {
    const elementToDeleteIndex = managers.findIndex(
      (position) => position.id === id
    );
    if (elementToDeleteIndex !== -1) {
      const newManagers = [...managers];
      newManagers.splice(elementToDeleteIndex, 1);
      setManagers(newManagers);
    }
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

  if (!userList) {
    return null;
  }

  return (
    <div className="flex flex-col items-start gap-4 border rounded p-2 mb-6 shadow-md">
      <div className="flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex gap-1 flex-wrap">
            {managers
              ? managers.map((manager) => {
                  return (
                    <div
                      key={manager.id}
                      className="flex justify-start w-fit mb-1 py-1 px-1 rounded bg-slate-200"
                    >
                      <p className="text-slate-500 pr-4 text-sm">
                        {manager.name}
                      </p>
                      <button onClick={handleDelete(manager.id)}>
                        <AiOutlineDelete size={16} className="text-[#a12064]" />
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <Form {...managersForm}>
        <form
          onSubmit={managersForm.handleSubmit(() => {})}
          className="flex flex-col gap-2 w-full z-[3]"
        >
          <FormField
            control={managersForm.control}
            name="managerId"
            render={({ field: { value, onChange } }) => {
              return (
                <FormItem>
                  <FormLabel>Managers</FormLabel>
                  <Select
                    defaultValue={value}
                    onValueChange={(e) => (onChange(e), handleChange(e))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Add a manager" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {userList &&
                        userList.map((user) => {
                          return (
                            <div
                              key={user.id}
                              className="flex justify-between items-center w-full"
                            >
                              <SelectItem
                                key={user.id}
                                value={user.id}
                                className="text-sm w-full"
                              >
                                {user.name}
                              </SelectItem>
                            </div>
                          );
                        })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <div className="flex justify-between">
            <Button
              className="py-0 h-7 rounded bg-smartpurple hover:bg-smartpurple/90"
              onClick={handleAddManager}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddManager;
