import { z } from "zod";

import { procedure, router } from "../trpc";

export const skillRouter = router({
  create: procedure
    .input(z.object({ skillTitle: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newSkill = await ctx.prisma.skill.create({
        data: {
          title: input.skillTitle,
          authorId: ctx?.session?.user.id,
        },
      });
      return newSkill;
    }),
  all: procedure.query(({ ctx }) => {
    return ctx.prisma.skill.findMany();
  }),
});
