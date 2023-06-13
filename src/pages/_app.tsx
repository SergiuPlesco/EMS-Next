import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

import { trpc } from "@/utils/trpc";

const MyApp: AppType<{ session: Session }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
			<ReactQueryDevtools initialIsOpen={false} />
		</SessionProvider>
	);
};

export default trpc.withTRPC(MyApp);
