import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDelete } from "react-icons/ai";
import { z } from "zod";

import Autocomplete from "@/components/Autocomplete/Autocomplete";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import generateId from "@/utils/generateId";
import { trpc } from "@/utils/trpc";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ISkill {
  id: number | string;
  title: string;
  rating: number | null;
  createdAt: Date;
}
const newSkillSchema = z.object({
  title: z.string(),
});
const AddSkill = () => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = useState("");
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [showNewTagForm, setShowNewTagForm] = useState(false);

  const newTagForm = useForm<z.infer<typeof newSkillSchema>>({
    resolver: zodResolver(newSkillSchema),
    defaultValues: {
      title: "",
    },
  });
  const { data: searchList, refetch: refetchSearchList } =
    trpc.skills.searchSkill.useQuery({
      searchQuery: inputValue,
    });

  const {
    data: userSkills,
    isLoading: isUserSkillsLoading,
    refetch,
  } = trpc.users.getSkills.useQuery();

  const updateSkills = trpc.users.updateSKills.useMutation({
    onSuccess: () => refetch(),
  });

  const createSkill = trpc.skills.create.useMutation();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };
  const handleOnClick = (title: string) => () => {
    const skillAdded = skills?.find((skill) => skill.title === title);

    if (title === "" || skillAdded) {
      return;
    }

    setSkills([
      ...skills,
      {
        id: generateId(),
        title,
        rating: 5, // default skill level 5%
        createdAt: new Date(),
      },
    ]);
    setInputValue("");
  };
  const handleDelete = (id: number | string) => () => {
    const elementToDeleteIndex = skills.findIndex(
      (position) => position.id === id
    );
    if (elementToDeleteIndex !== -1) {
      const newSkill = [...skills];
      newSkill.splice(elementToDeleteIndex, 1);
      setSkills(newSkill);
    }
  };

  const handleSave = () => {
    updateSkills.mutate(
      {
        skills: [
          ...skills.map((skill) => ({
            title: skill.title,
            rating: skill.rating || 0,
            createdAt: skill.createdAt,
          })),
        ],
      },
      {
        onSuccess: () => {
          toast({
            description: "Skills are updated",
            variant: "success",
          });
        },
        onError: () => {
          toast({
            description: "An error occured, try again",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleOpenNewTagForm = () => {
    setShowNewTagForm((actual) => !actual);
  };

  const onCreateNewPositon = (values: z.infer<typeof newSkillSchema>) => {
    createSkill.mutate(
      {
        title: values.title,
      },
      {
        onSuccess: () => {
          newTagForm.reset();
          refetchSearchList();
          toast({
            description: "New skill added to the list",
            variant: "success",
          });
        },
      }
    );
  };

  useEffect(() => {
    if (!isUserSkillsLoading && userSkills) {
      setSkills(
        userSkills.map((skill) => ({
          id: generateId(),
          title: skill.title,
          rating: skill.rating,
          createdAt: skill.createdAt,
        }))
      );
    }
  }, [isUserSkillsLoading, userSkills]);

  if (userSkills == null) {
    return null;
  }
  return (
    <div className="flex flex-col gap-2 border rounded p-2 mb-6 shadow-md">
      <div className="flex flex-col w-full mb-4">
        <div className="flex justify-between">
          <div className="flex gap-1 flex-wrap">
            {skills
              ? skills.map((skill) => {
                  return (
                    <div
                      key={generateId()}
                      className="flex justify-start items-center gap-2 w-fit mb-1 py-1 px-1 rounded bg-slate-200"
                    >
                      <p className="text-slate-500 text-sm">{skill.title}</p>
                      <p className="text-[0.5rem]">{skill.rating}%</p>
                      <button onClick={handleDelete(skill.id)}>
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
        onClick={handleOnClick}
      />

      <div className="flex justify-between mb-4">
        <Button
          type="submit"
          className="py-0 h-7 rounded bg-blue-300 bg-smartpurple"
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="py-0 h-7 rounded bg-smartgreen hover:bg-smartgreen/50"
          onClick={handleOpenNewTagForm}
        >
          {showNewTagForm ? "-" : "+"}
        </Button>
      </div>
      {showNewTagForm && (
        <div className="w-full">
          <Form {...newTagForm}>
            <form
              onSubmit={newTagForm.handleSubmit(onCreateNewPositon)}
              className="flex flex-col gap-2 w-full"
            >
              <FormField
                control={newTagForm.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>New Skill (correct name)</FormLabel>
                      <FormControl>
                        <Input placeholder="New Skill" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <div>
                <Button
                  type="submit"
                  className="py-0 h-7 rounded bg-blue-300 bg-smartpurple"
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddSkill;
