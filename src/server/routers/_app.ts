import { router } from "../trpc";
import { skillRouter } from "./skillRouter";
import { userRouter } from "./userRouter";

export const appRouter = router({
  users: userRouter,
  skills: skillRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
