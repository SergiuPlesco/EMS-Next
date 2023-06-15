import React from "react";
import styled from "styled-components";

interface SwitchProps {
  checked: boolean;
  handleChange: () => void;
}

const Switch = ({ checked = false, handleChange }: SwitchProps) => {
  return (
    <SwitchButton>
      <SwitchInput type="checkbox" checked={checked} onChange={handleChange} />
      <SwitchSlider />
    </SwitchButton>
  );
};

export default Switch;

const SwitchButton = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #000000;
  }

  &:checked + span:before {
    transform: translateX(22px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    top: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
