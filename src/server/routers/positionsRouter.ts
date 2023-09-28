import { z } from "zod";

import { procedure, router } from "../trpc";

export const positionsRouter = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.positions.findMany();
  }),
  createNewPosition: procedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.positions.create({
        data: {
          title: input.title,
        },
      });
    }),
  deletePosition: procedure
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.positions.delete({
        where: {
          id: input.positionId,
        },
      });
    }),
});
