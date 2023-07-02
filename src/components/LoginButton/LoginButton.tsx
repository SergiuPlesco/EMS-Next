import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";

import googleIcon from "../../../public/googleIcon.svg";

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  const handleSignin = () => {
    if (status === "unauthenticated") {
      setIsLoading(true);
    }
    signIn("google");
  };

  return (
    <Button onClick={handleSignin}>
      <Loader isLoading={isLoading}>
        <Image src={googleIcon} width={32} height={32} alt="" />
      </Loader>
      Sign in with Google
    </Button>
  );
};

export default LoginButton;

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
  padding: 0.5rem 2rem;
`;

const Loader = styled.div<{ isLoading: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.625rem;
  height: 1.625rem;
  border-radius: 50%;
  -webkit-animation: ${(props) =>
    props.isLoading ? "spin 2s infinite" : "none"};
  animation: ${(props) => (props.isLoading ? "spin 2s infinite" : "none")};

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
