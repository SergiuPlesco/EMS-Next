import { z } from "zod";

import { prisma } from "../prisma";
import { procedure, router } from "../trpc";

export const skillRouter = router({
  add: procedure
    .input(z.object({ id: z.string(), skill: z.string() }))
    .mutation(async () => {
      // const newSkill = prisma.skill.create({
      // 	data: {
      // 		id: opts.input.id,
      // 		value: opts.input.skill,
      // 		userId: opts.ctx.
      // 	}
      // })
      return;
    }),
  getAll: procedure.query(() => {
    return prisma.skill.findMany();
  }),
});
