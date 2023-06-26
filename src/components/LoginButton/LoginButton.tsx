import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <>
      <Link
        href="/api/auth/signin"
        style={{
          padding: "0.5rem 2rem",
        }}
      >
        Sign in
      </Link>
      <button
        style={{
          padding: "0.5rem 2rem",
        }}
        onClick={() => signIn("google")}
      >
        Sign in
      </button>
    </>
  );
};

export default LoginButton;
