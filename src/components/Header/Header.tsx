import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import styled from "styled-components";

import LogoImg from "@/assets/images/logo.svg";
import ProfileImg from "@/assets/images/profile-picture.png";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import Switch from "@/components/Switch";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { data: session } = useSession();

  const handleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <Wrapper>
      <Container>
        <Logo src={LogoImg} alt="Logo" />

        <ProfileContainer>
          <Switch checked={isDarkMode} handleChange={handleDarkMode} />
          <Paragraph>Greetings, {session && session?.user?.name}</Paragraph>
          <ProfileImage
            src={(session && session?.user?.image) || ProfileImg}
            width={30}
            height={30}
            alt="Profile"
          />
          <LogoutButton />
        </ProfileContainer>
      </Container>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.primary};
  box-shadow: 0px 2px 5px rgba(128, 128, 128, 0.05);
  padding: 0 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Paragraph = styled.p`
  margin: 0;
`;

const ProfileImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`;

const Logo = styled(Image)`
  -webkit-user-drag: none;
`;
