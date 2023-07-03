import { signOut, useSession } from "next-auth/react";
import React from "react";
import styled from "styled-components";
const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (session && status === "authenticated") {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }
  return null;
};

export default LogoutButton;

const Button = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 1px 1px 2px rgba(70, 45, 212, 0.5),
    -1px -1px 2px rgba(207, 23, 23, 0.5);
  padding: 0.5rem 1rem;
`;
