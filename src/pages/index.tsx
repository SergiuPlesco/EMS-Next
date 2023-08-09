import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Skill from "@/components/Skill/skill";
import { trpc } from "@/utils/trpc";

export interface ISkill {
  title: string;
  id: string;
  authorId: string;
  rating: number;
}

const HomePage = () => {
  const { data: session } = useSession();

  const { data: fetchedskills } = trpc.skills.skillByUserId.useQuery();
  const { data: fetchedtopSkills } = trpc.skills.fetchTopSkills.useQuery();

  const [skills, setSkills] = useState<Array<ISkill>>([]);
  const [topSkills, setTopSkills] = useState<Array<ISkill>>([]);

  useEffect(() => {
    if (fetchedskills && fetchedtopSkills) {
      setSkills(fetchedskills);
      setTopSkills(fetchedtopSkills);
    }
  }, [fetchedskills, fetchedtopSkills]);

  const handleSkillDelete = (skillId: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  return (
    <>
      <section>
        <Title>My profile</Title>
        <ProfileContainer>
          <BackgroundImage src="/profile-background.png"></BackgroundImage>
          <InfoContainer>
            <ProfileImage src={session?.user?.image || ""} />
            <ProfileInfo>
              <p>{session?.user?.name}</p>
            </ProfileInfo>
            <BestSkillsSection>
              {topSkills.length < 3 ? (
                <Info>Add at least 3 skills to see you are best skills</Info>
              ) : (
                <>
                  <div>
                    <p style={{ fontSize: "12px", fontWeight: "600" }}>
                      Best skills:{" "}
                    </p>
                  </div>

                  <SkillsContainer
                    style={{ width: "70%", justifyContent: "space-around" }}
                  >
                    {topSkills?.map((topSkill) => {
                      return (
                        <Skill
                          key={topSkill.id}
                          fetchedSkill={topSkill}
                          onDelete={handleSkillDelete}
                          disableAnimation={true}
                          titleStyle={{ fontSize: "10px" }}
                          profileStyle={{ width: "14px", height: "14px" }}
                          ratingStyle={{ fontSize: "8px" }}
                          iconStyle={{ width: "12px", height: "12px" }}
                        />
                      );
                    })}
                  </SkillsContainer>
                </>
              )}
            </BestSkillsSection>
          </InfoContainer>
        </ProfileContainer>
      </section>

      <section className="skills_section">
        <Title>My skills</Title>
        <Info style={{ marginBottom: "35px" }}>
          Click on a skill to make changes
        </Info>

        <SkillsContainer>
          {skills?.map((skill) => {
            return (
              <Skill
                key={skill.id}
                fetchedSkill={skill}
                onDelete={handleSkillDelete}
              />
            );
          })}
        </SkillsContainer>
      </section>
    </>
  );
};

export default HomePage;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  box-shadow: 2px 2px 4px #d3d3d3, -2px -2px 4px #d3d3d3;
  height: 401px;
  max-width: 550px;
  margin-bottom: 50px;
`;

const InfoContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const BackgroundImage = styled.img`
  height: 110px;
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  object-fit: cover;
`;

const SkillsContainer = styled.div`
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const ProfileImage = styled.img`
  background-color: red;
  border-radius: 50px;
  width: 75px;
  height: 75px;
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BestSkillsSection = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const Info = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 15px;
`;
