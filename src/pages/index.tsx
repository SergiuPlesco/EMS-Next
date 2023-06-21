import { useSession } from "next-auth/react";
import React from "react";

import MainLayout from "@/layouts/MainLayout";
import SignInLayout from "@/layouts/SignInLayout/SignInLayout";

const HomePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <SignInLayout />;
  }

  return <MainLayout>Content</MainLayout>;
};

export default HomePage;
