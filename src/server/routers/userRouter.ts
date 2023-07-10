import { z } from "zod";

import { procedure, router } from "../trpc";

export const userRouter = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  getById: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
  updateSKill: procedure
    .input(z.object({ rating: z.number(), skillId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const updatedSkill = await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          skills: {
            update: {
              where: {
                id: input.skillId,
              },
              data: {
                rating: input.rating,
              },
            },
          },
        },
      });
      return updatedSkill;
    }),
});
