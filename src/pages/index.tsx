import React from "react";
import { trpc } from "@/utils/trpc";
import MainLayout from "@/layouts/MainLayout";

const index = () => {
  const hello = trpc.hello.useQuery({ text: "client" });

  if (!hello.data) {
    return <div>loading...</div>;
  }

  return <MainLayout>Content</MainLayout>;
};

export default index;
