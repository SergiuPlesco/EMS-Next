import { signOut, useSession } from "next-auth/react";
import React from "react";
const LogoutButton = () => {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }
  return null;
};

export default LogoutButton;
