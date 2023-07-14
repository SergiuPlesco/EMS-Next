import Image from "next/image";
import React, { CSSProperties,useState } from "react";
import styled from "styled-components";

import { ISkill } from "@/pages";
import { trpc } from "@/utils/trpc";

import DeleteIcon from "../../../public/Vector.svg";

type IProps = {
  fetchedSkill: {
    title: string;
    id: string;
    authorId: string;
    rating: number;
  };
  containerStyles?: CSSProperties;
  titleStyle?: CSSProperties;
  profileStyle?: CSSProperties;
  ratingStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  disableAnimation?: boolean;
};

const Skill = ({
  fetchedSkill,
  containerStyles,
  titleStyle,
  profileStyle,
  ratingStyle,
  iconStyle,
  disableAnimation = false,
}: IProps) => {
  const deleteSkill = trpc.users.deleteSkill.useMutation();
  const updateSkillRating = trpc.users.updateSKill.useMutation();

  const [skill, setSkill] = useState<ISkill>(fetchedSkill);
  // const [isHovered, setIsHovered] = useState(false);
  const [showRatingChange, setShowRatingChange] = useState<boolean>(false);
  // const [globalTimeout, setGlobalTimeout] = useState<any>(undefined);

  // const handleSetTimeouts = (nextHoverState: boolean) => {
  //   if (nextHoverState == true) {
  //     const timeout = setTimeout(() => {
  //       setIsHovered(true)
  //     }, 150);

  //     setGlobalTimeout(timeout);
  //   }

  //   if (nextHoverState == false) {
  //     clearTimeout(globalTimeout);

  //     const timeout = setTimeout(() => {
  //       setIsHovered(false);
  //     }, 100);

  //     setGlobalTimeout(timeout);
  //   }
  // }

  const deleteUserSkill = () => {
    deleteSkill.mutate({ skillId: skill.id });
  };

  const handleRatingUpdate = (skillId: string, rating: number) => {
    // check on error
    updateSkillRating.mutate({ rating, skillId });

    setShowRatingChange(false);
    setSkill((prev) => ({ ...prev, rating }));
  };

  return (
    <SkillContainer
      key={skill.id}
      style={{
        ...containerStyles,
        pointerEvents: disableAnimation ? "none" : "auto",
      }}
      // onMouseEnter={() => handleSetTimeouts(true)}
      // onMouseLeave={() => handleSetTimeouts(false)}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        {!disableAnimation && (
          <div style={{ marginRight: "2px" }}>
            <Image
              src={DeleteIcon}
              onClick={() => deleteUserSkill()}
              width={9}
              height={9}
              alt=""
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
        <SkillImage src="/skill_icon.png" style={iconStyle} />
        <SkillTitle style={titleStyle}>{skill.title}</SkillTitle>
      </div>

      <Rating
        style={profileStyle}
        onClick={() => setShowRatingChange((prev) => !prev)}
      >
        {showRatingChange && (
          <RatingChangeContainer>
            <>
              {Array.from({ length: 4 }, (_, index) => index + 1).map(
                (rating) => (
                  <RatingOption
                    key={rating}
                    style={{ display: "flex", cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRatingUpdate(skill.id, rating);
                    }}
                  >
                    <RatingNumber>{rating}</RatingNumber>
                    <p style={{ color: "#D3D3D3", padding: "0px 3px 0px 3px" }}>
                      |
                    </p>
                  </RatingOption>
                )
              )}
              <RatingNumber
                onClick={(e) => {
                  e.stopPropagation();
                  handleRatingUpdate(skill.id, 5);
                }}
              >
                5
              </RatingNumber>
            </>
          </RatingChangeContainer>
        )}

        <p style={ratingStyle}>{skill.rating}</p>
      </Rating>

      {/* {
        isHovered && (
          <ActionOptionsContainer>
            <SaveButton onClick={() => console.log('save')}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/check_icon.png" alt="" style={{ height: '7px'}} />
                <p style={{ fontSize: '11px', color: '#FFFFFF',  marginLeft: '5px'}}>Save</p>
              </div>
            </SaveButton>
            <CancelButton onClick={() => console.log('cancel')}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/x_red.png" alt="" style={{ height: '7px'}}/>
                <p style={{ fontSize: '11px', color: '#000000', marginLeft: '5px'}}>Cancel</p>
              </div>          
            </CancelButton>
          </ActionOptionsContainer>
        )
      } */}
    </SkillContainer>
  );
};

export default Skill;

const SkillContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #d3d3d3;
  padding: 8px;
  border-radius: 20px;
  box-shadow: 1px 1px 2px #d3d3d3, -1px -1px 2px #d3d3d3;
  transition: 0.3s ease-in;
  gap: 10px;
`;

const Rating = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50px;
  border: 1px solid #662d91;
  transition: 0.9s ease-in-out;

  &: hover {
    background-color: #d8bfd8;
  }
`;

const SkillTitle = styled.p`
  font-weight: 400;
  font-size: 16px;
`;

const SkillImage = styled.img`
  height: 18px;
  width: 18px;
`;

// const ActionOptionsContainer = styled.div`
//   display: flex;
//   gap: 10px;
// `

// const SaveButton = styled.div`
//   cursor: pointer;
//   border-radius: 5px;
//   background-color: #8DC63F;
//   padding: 4px 16px 4px 16px;
//   justify-content: space-between;
// `

// const CancelButton = styled.div`
//   cursor: pointer;
//   border: 1px solid #A12064;
//   border-radius: 5px;
//   background-color: #FFFFFF;
//   padding: 4px 16px 4px 16px;
// `

const RatingChangeContainer = styled.div`
  z-index: 2;
  position: absolute;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  left: 50%;
  top: -90%;
  border: 1px solid #d3d3d3;
  padding: 4px 8px 4px 8px;
  transform: translate(-50%, -50%);
`;
const RatingOption = styled.div``;

const RatingNumber = styled.p`
  &:hover {
    background-color: #d3d3d3;
  }
`;

// const DeleteSkillIcon = styled.img`
//   transition: opacity 0.3s ease;
//   cursor: pointer;
// `
