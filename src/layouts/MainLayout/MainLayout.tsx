import React from "react";
import styled from "styled-components";

import Header from "@/components/Header";
import NavigationBar from "@/components/NavigationBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
