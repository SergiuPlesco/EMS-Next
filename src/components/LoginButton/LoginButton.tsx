import { signIn, signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <a
        href={`/api/auth/signin`}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </a>
    </>
  );
};

export default LoginButton;
