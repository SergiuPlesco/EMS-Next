import Image from "next/image";
import React from "react";
import styled from "styled-components";

import ProfileImg from "@/assets/images/profile-picture.png";
import { Rating } from "@/components/styled";

const employees = [1, 2, 3];

interface TableProps {
  onActionClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const Table = ({ onActionClick }: TableProps) => {
  return (
    <Container>
      <Header>
        <div />
        <div>Employee</div>
        <div>Level of knowledge</div>
        <div />
      </Header>
      <RowList>
        {employees.map((item, index) => (
          <Row key={index} lcBorder={employees.length < 8}>
            <div>{item}.</div>
            <EmployeeContainer>
              <EmployeeAvatar src={ProfileImg} alt="profile" />
              <div>
                <UserName>User name</UserName>
                <div>Frontend dev</div>
              </div>
            </EmployeeContainer>
            <div>
              <Rating>5</Rating>
            </div>
            <Action onClick={onActionClick}>Show all skills</Action>
          </Row>
        ))}
      </RowList>
    </Container>
  );
};

export default Table;

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
