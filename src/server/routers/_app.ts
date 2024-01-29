import { router } from "../trpc";
import { adminRouter } from "./adminRouter";
import { filtersRouter } from "./filters/router";
import { positionsRouter } from "./positionsRouter";
import { projectRouter } from "./projectsRouter";
import { skillsRouter } from "./skillsRouter";
import { userRouter } from "./userRouter/userRouter";

export const appRouter = router({
  users: userRouter,
  skills: skillsRouter,
  positions: positionsRouter,
  projects: projectRouter,
  admin: adminRouter,
  filters: filtersRouter,
});

export type AppRouter = typeof appRouter;
