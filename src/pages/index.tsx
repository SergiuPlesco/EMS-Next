import { useSession } from "next-auth/react";
import React from "react";

import MainLayout from "@/layouts/MainLayout";
import SignInLayout from "@/layouts/SignInLayout/SignInLayout";

const HomePage = () => {
  const { status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  if (status === "unauthenticated") {
    return <SignInLayout />;
  }

  return <MainLayout>Content</MainLayout>;
};

export default HomePage;
