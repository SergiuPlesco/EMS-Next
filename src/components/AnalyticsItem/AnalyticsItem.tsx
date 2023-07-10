import Image from "next/image";
import React from "react";
import styled from "styled-components";

import JavaScriptLogo from "@/assets/images/js-logo.svg";

interface AnalyticsItemProps {
  onClick: () => void;
}

const AnalyticsItem = ({ onClick }: AnalyticsItemProps) => {
  return (
    <Container onClick={onClick}>
      <RatingContainer>
        <Score>4.5</Score>
        <Logo src={JavaScriptLogo} alt="language" />
      </RatingContainer>

      <Name>JavaScript</Name>
    </Container>
  );
};

export default AnalyticsItem;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const RatingContainer = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: rgba(161, 32, 100, 0.5);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const Score = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  font-weight: bold;
  font-size: 28px;
`;

const Name = styled.div`
  font-weight: 600;
`;

const Logo = styled(Image)`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 20px;
  right: 20px;
`;
