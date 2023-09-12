import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import ProfileImg from "@/assets/images/profile-picture.png";
import SkillChip from "@/components/SkillChip/";

const employees = [
  {
    name: "Iulian Banilean",
    skills: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    name: "Constantin",
    skills: [1, 2, 3, 4, 5, 6],
  },
  {
    name: "Sergiu",
    skills: [1, 2, 3, 2, 2, 3, 4, 5],
  },
];

const EmployeesTable = () => {
  const skillsContainerRef = useRef<HTMLDivElement | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    checkRowExpansion();
  }, []);

  const checkRowExpansion = () => {
    if (skillsContainerRef.current) {
      const skillsContainerHeight = skillsContainerRef.current.offsetHeight;

      const expandedRowsCopy = [...expandedRows];

      if (skillsContainerHeight > 40 && !expandedRowsCopy.includes(0)) {
        expandedRowsCopy.push(0);
      } else if (skillsContainerHeight <= 40 && expandedRowsCopy.includes(0)) {
        const index = expandedRowsCopy.indexOf(0);
        expandedRowsCopy.splice(index, 1);
      }

      setExpandedRows(expandedRowsCopy);
    }
  };

  return (
    <Container>
      <Header>
        <div />
        <div>Employee</div>
        <div>Skills</div>
        <div />
      </Header>
      <RowList>
        {employees.map((item, index) => {
          const isExpanded = expandedRows.includes(index);

          return (
            <Row key={index} lcBorder={employees.length < 8}>
              <Counter>{index + 1}.</Counter>
              <EmployeeContainer>
                <EmployeeAvatar src={ProfileImg} alt="profile" />
                <div>
                  <UserName>{item.name}</UserName>
                  <div>Frontend dev</div>
                </div>
              </EmployeeContainer>
              <SkillsContainer isExpanded={isExpanded} ref={skillsContainerRef}>
                {item.skills.map((skill, index) => (
                  <SkillChip key={index} name="JavaScript" rating="5" small />
                ))}
              </SkillsContainer>
              <Action
                onClick={() =>
                  setExpandedRows((prevState) => {
                    if (isExpanded) {
                      return prevState.filter((row) => row !== index);
                    } else {
                      return [...prevState, index];
                    }
                  })
                }
              >
                {isExpanded ? "Collapse" : "Expand"}
              </Action>
            </Row>
          );
        })}
      </RowList>
    </Container>
  );
};

export default EmployeesTable;

const Container = styled.div`
  display: grid;
  grid-template-rows: 50px minmax(auto, 487px);
  border-radius: 20px;
  border: 1px solid #d3d3d3;
  background: #fff;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 0.2fr 2fr 3fr 1fr;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border-bottom: 1px solid #d3d3d3;
`;

const SkillsContainer = styled.div<{ isExpanded: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  height: ${(props) => (props.isExpanded ? "100%" : "48px")};
  overflow: hidden;
  padding: 5px;
`;

const RowList = styled.div`
  overflow-y: auto;
`;

const Row = styled.div<{ lcBorder: boolean }>`
  display: grid;
  grid-template-columns: 0.2fr 2fr 3fr 1fr;
  align-items: center;
  border-bottom: 1px solid #d3d3d3;
  padding: 10px;

  &:last-child {
    border-bottom: ${(props) =>
      props.lcBorder ? "1px solid #d3d3d3" : "none"};
  }
`;

const EmployeeContainer = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 10px;
`;

const EmployeeAvatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const UserName = styled.div`
  font-weight: bold;
`;

const Action = styled.div`
  cursor: pointer;
  text-decoration: underline;
  text-align: center;
`;

const Counter = styled.div`
  display: flex;
  align-self: flex-start;
  padding-top: 10px;
  justify-content: center;
`;
