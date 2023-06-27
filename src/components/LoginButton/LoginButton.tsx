import Link from "next/link";

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
    </>
  );
};

export default LoginButton;
