import { router } from "../trpc";
import { positionRouter } from "./positionRouter";
import { skillRouter } from "./skillRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  users: userRouter,
  skills: skillRouter,
  positions: positionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
