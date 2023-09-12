import { router } from "../trpc";
import { positionsRouter } from "./positionsRouter";
import { skillsRouter } from "./skillsRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  users: userRouter,
  skills: skillsRouter,
  positions: positionsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
