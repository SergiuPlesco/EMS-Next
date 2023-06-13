import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import styled from "styled-components";

import { AiFillHome } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { SiSimpleanalytics } from "react-icons/si";
import { BsPeopleFill } from "react-icons/bs";

const navigationTabs = [
  { icon: AiFillHome, path: "/", title: "Home" },
  { icon: MdAddBox, path: "/add-skill", title: "Add skill" },
  { icon: SiSimpleanalytics, path: "/analytics", title: "Analytics" },
  { icon: BsPeopleFill, path: "/employees", title: "Employees" },
];

const NavigationBar = () => {
  const router = useRouter();

  return (
    <Container>
      {navigationTabs.map((item, index) => (
        <Tab href={item.path} key={index}>
          <item.icon
            color={router.pathname === item.path ? "#A02065" : "#E2E2E2"}
            size={28}
          />
          <Paragraph $active={router.pathname === item.path}>
            {item.title}
          </Paragraph>
        </Tab>
      ))}
    </Container>
  );
};

export default NavigationBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  height: calc(100vh - 60px);
  padding: 50px 42px;
  gap: 25px;
  border-right: 1px solid #efefef;
  box-shadow: 2px 0px 5px rgba(128, 128, 128, 0.05);
`;

const Tab = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
  text-decoration: none;
  color: #000;
`;

const Paragraph = styled.p<{ $active: boolean }>`
  color: ${(props) => (props.$active ? "#A02065" : "#000")};
`;
