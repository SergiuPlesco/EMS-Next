import { router } from "../trpc";
import { adminRouter } from "./adminRouter";
import { positionsRouter } from "./positionsRouter";
import { projectRouter } from "./projectsRouter";
import { skillsRouter } from "./skillsRouter";
import { userRouter } from "./useRouter/userRouter";

export const appRouter = router({
  users: userRouter,
  skills: skillsRouter,
  positions: positionsRouter,
  projects: projectRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
