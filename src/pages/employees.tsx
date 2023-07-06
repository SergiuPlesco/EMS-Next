import React from "react";
import styled from "styled-components";

import EmployeesTable from "@/components/EmployeesTable/EmployeesTable";
import { Title } from "@/components/styled";

const EmployeesPage = () => {
  return (
    <Container>
      <div>
        <Title>Employees</Title>
        <p>
          All company employees with some skills listed. To view all the skills
          of an employee click on “Expand”.
        </p>
      </div>
      <EmployeesTable />
    </Container>
  );
};

export default EmployeesPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
