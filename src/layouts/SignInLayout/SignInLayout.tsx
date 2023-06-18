import React from "react";
import styled from "styled-components";

import LoginButton from "@/components/LoginButton/LoginButton";

const SignInLayout = () => {
  return (
    <Container>
      <LogoText>smartskills</LogoText>
      <LoginButton />
    </Container>
  );
};

export default SignInLayout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding-top: 5rem;
`;

const LogoText = styled.p`
  font-weight: bold;
  letter-spacing: 0.1rem;
  font-family: monospace;
  font-size: 1.3rem;
`;
