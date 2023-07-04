import { z } from "zod";

import { procedure, router } from "../trpc";
import { skillRouter } from "./skillRouter";

export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  skill: skillRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
