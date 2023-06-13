import React from "react";

import MainLayout from "@/layouts/MainLayout";
import { trpc } from "@/utils/trpc";

const index = () => {
  const hello = trpc.hello.useQuery({ text: "client" });

  if (!hello.data) {
    return <div>loading...</div>;
  }

  return <MainLayout>Content</MainLayout>;
};

export default index;
