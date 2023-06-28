import Image from "next/image";
import { signIn } from "next-auth/react";

import googleIcon from "../../../public/googleIcon.svg";

const LoginButton = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        borderRadius: "4px",
        backgroundColor: "#fff",
        boxShadow: "1px 1px 5px rgba(0,0,0, 0.5)",
        padding: "0.5rem 2rem",
      }}
    >
      <Image src={googleIcon} width={32} height={32} alt="" />
      <button
        onClick={() => signIn("google")}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default LoginButton;
