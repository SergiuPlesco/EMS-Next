import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import Skill from "@/components/Skill/skill";
import UserPosition from "@/components/UserPosition/UserPosition";
import { ISkill } from "@/types/ISkill";
import { trpc } from "@/utils/trpc";

const Profile = () => {
  const { data: session } = useSession();

  const { data: fetchedskills } = trpc.skills.skillByUserId.useQuery();
  const { data: fetchedtopSkills } = trpc.skills.fetchTopSkills.useQuery();

  const [skills, setSkills] = useState<Array<ISkill>>([]);

  useEffect(() => {
    if (fetchedskills && fetchedtopSkills) {
      setSkills(fetchedskills);
    }
  }, [fetchedskills, fetchedtopSkills]);

  const handleSkillDelete = (skillId: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  if (!session) {
    return <h1>loading</h1>;
  }

  return (
    <div className="flex flex-col gap-16">
      <section>
        <div className="flex gap-4 items-center mb-4">
          <div>
            <Image
              src={session?.user?.image as string}
              alt="Profile image"
              width={75}
              height={75}
              className="rounded-full"
              priority
            />
          </div>

          <div>
            <h2 className="text-xl">{session?.user?.name}</h2>
            <p className="text-xs text-slate-500">{session?.user?.email}</p>
          </div>
        </div>
        <UserPosition />
      </section>

      <section>
        <p className="text-2xl mb-4">Skills</p>
        <p className="text-sm font-normal mb-8">
          Click on a skill to make changes
        </p>

        <div className="w-full gap-5 flex flex-wrap">
          {skills?.map((skill) => {
            return (
              <Skill
                key={skill.id}
                fetchedSkill={skill}
                onDelete={handleSkillDelete}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Profile;
