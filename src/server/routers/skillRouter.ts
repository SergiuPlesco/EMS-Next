import { z } from "zod";

import { prisma } from "../prisma";
import { procedure, router } from "../trpc";

export const skillRouter = router({
  add: procedure
    .input(z.object({ id: z.string(), skill: z.string() }))
    .mutation(async (opts) => {
      prisma.skill.create({
        data: {
          userId: opts.input.id,
          value: opts.input.skill,
        },
      });
      return opts;
    }),
});
