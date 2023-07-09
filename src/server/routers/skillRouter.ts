import { z } from "zod";

// import { prisma } from "../prisma";
import { procedure, router } from "../trpc";

export const skillRouter = router({
  add: procedure
    .input(z.object({ id: z.string(), skill: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newSkill = ctx.prisma.skill.create({
        data: {
          value: input.skill,
          userId: ctx.session?.user.id,
        },
      });
      return newSkill;
    }),
  getAll: procedure.query(({ ctx }) => {
    return ctx.prisma.skill.findMany();
  }),
});
