import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import Skill from "@/components/Skill/skill";
import UserIdentity from "@/components/UserIdentity/UserIdentity";
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
      <section className="">
        <UserIdentity
          userImage={session?.user?.image as string}
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />
        <UserPosition />
      </section>

      <section>
        <p className="text-2xl mb-4">Skills</p>

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
