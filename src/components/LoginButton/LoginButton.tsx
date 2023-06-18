import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <Link
        href="/api/auth/signin"
        style={{
          padding: "0.5rem 2rem",
        }}
        // onClick={() => signIn()}
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
