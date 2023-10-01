import { TRPCError } from "@trpc/server";
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
      const positonTitle = await ctx.prisma.positions.findUnique({
        where: {
          id: input.positionId,
        },
      });
      const isPositionUsed = await ctx.prisma.user.findFirst({
        where: {
          positions: {
            some: {
              title: positonTitle?.title,
            },
          },
        },
        include: {
          positions: true,
          skills: true,
        },
      });
      if (isPositionUsed) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "The position is in use and can't be deleted.",
        });
      }
      return await ctx.prisma.positions.delete({
        where: {
          id: input.positionId,
        },
      });
    }),
});
