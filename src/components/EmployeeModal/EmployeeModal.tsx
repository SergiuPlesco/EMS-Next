import Image from "next/image";
import React from "react";
import styled from "styled-components";

import BackgroundImage from "@/assets/images/background-profile.png";
import CloseIcon from "@/assets/images/close-icon.svg";
import ProfileImage from "@/assets/images/profile-picture.png";
import Modal from "@/components/Modal/Modal";
import SkillChip from "@/components/SkillChip";

interface EmployeeModalProps {
  onClose: () => void;
}

const EmployeeModal = ({ onClose }: EmployeeModalProps) => {
  return (
    <Modal onClose={onClose}>
      <EmployeeModalContainer>
        <Background src={BackgroundImage} alt="background" />
        <CloseButton onClick={onClose} src={CloseIcon} alt="close" />
        <Content>
          <Avatar src={ProfileImage} alt="profile" />
          <Info>
            <div>Iulian Biznes</div>
            <div>Front-end Developer</div>
          </Info>

          <SkillList>
            <SkillChip name="Skill" rating="5" />
            <SkillChip name="Skill" rating="3" />
            <SkillChip name="Skill" rating="4" />
            <SkillChip name="Skill" rating="1" />
            <SkillChip name="Skill" rating="2" />
            <SkillChip name="Skill" rating="5" />
          </SkillList>
        </Content>
      </EmployeeModalContainer>
    </Modal>
  );
};

export default EmployeeModal;

const EmployeeModalContainer = styled.div`
  width: 100%;
  max-width: 600px;
  position: relative;
  border-radius: 20px;
  background-color: #fff;
`;

const Background = styled(Image)`
  width: 100%;
  height: 135px;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
`;

const Avatar = styled(Image)`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const CloseButton = styled(Image)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Content = styled.div`
  margin-top: -70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding: 0 40px 65px 40px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div:first-child {
    font-weight: bold;
    font-size: 20px;
  }
  & > div:last-child {
    font-size: 18px;
    color: #808080;
  }
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;
