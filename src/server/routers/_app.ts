import { router } from "../trpc";
import { skillRouter } from "./skillRouter";

export const appRouter = router({
  skill: skillRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
