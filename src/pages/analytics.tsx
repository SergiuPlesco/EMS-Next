import React, { useState } from "react";
import styled from "styled-components";

import AnalyticsItem from "@/components/AnalyticsItem";
import AnalyticsTable from "@/components/AnalyticsTable";
// import EmployeeModal from "@/components/EmployeeModal";
import { Title } from "@/components/styled";

const AnalyticsPage = () => {
  // const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const handleShowTable = () => {
    setShowTable(true);
  };

  const handleOpenModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // setShowModal(true);
  };

  // const handleCloseModal = () => {
  // 	setShowModal(false);
  // };

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
          <AnalyticsTable onActionClick={handleOpenModal} />
        </TableContainer>
      ) : null}

      {/* {showModal ? <EmployeeModal onClose={handleCloseModal} /> : null} */}
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
