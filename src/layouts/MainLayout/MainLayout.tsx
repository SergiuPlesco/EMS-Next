import { useSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";

import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";

import SignInLayout from "../SignInLayout/SignInLayout";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { data: session } = useSession();

  if (!session) {
    return <SignInLayout />;
  }

  return (
    <>
      <Header />

      <MainContainer>
        <NavigationBar />
        <ChildrenContainer>{children}</ChildrenContainer>
      </MainContainer>
    </>
  );
};

export default MainLayout;

const MainContainer = styled.main`
  display: flex;
`;

const ChildrenContainer = styled.div`
  width: 100%;
  padding: 50px 60px 0 60px;
`;
