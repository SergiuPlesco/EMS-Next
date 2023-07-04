import React, { useState } from "react";
import styled from "styled-components";

import AnalyticsItem from "@/components/AnalyticsItem";
import { Title } from "@/components/styled";
import Table from "@/components/Table";

const AnalyticsPage = () => {
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = () => {
    setShowTable(true);
  };

  return (
    <Container>
      <div>
        <Title>Analytics</Title>
        <p>
          Click on the interested skill to check the employees that possess it.
        </p>
      </div>

      <AnalyticsList>
        <AnalyticsItem onClick={handleShowTable} />
        <AnalyticsItem onClick={handleShowTable} />
        <AnalyticsItem onClick={handleShowTable} />
        <AnalyticsItem onClick={handleShowTable} />
      </AnalyticsList>

      {showTable ? (
        <TableContainer>
          <Title>JavaScript</Title>
          <Table />
        </TableContainer>
      ) : null}
    </Container>
  );
};

export default AnalyticsPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const AnalyticsList = styled.div`
  display: flex;
  gap: 30px;
`;
