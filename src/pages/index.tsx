import React from "react";
import { trpc } from "@/utils/trpc";

const index = () => {
	const hello = trpc.hello.useQuery({ text: "client" });

	if (!hello.data) {
		return <div>loading...</div>;
	}

	return <div>{hello.data.greeting}</div>;
};

export default index;
