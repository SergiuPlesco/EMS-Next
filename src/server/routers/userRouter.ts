import { z } from "zod";

import { procedure, router } from "../trpc";

export const userRouter = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  getById: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
      });
    }),
  updateSKill: procedure
    .input(z.object({ rating: z.number(), skillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const updatedSkill = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx?.session?.user.id,
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
  deleteSkill: procedure
    .input(z.object({ skillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deleteSkill = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
        data: {
          skills: {
            delete: {
              id: input.skillId,
            },
          },
        },
      });
      return deleteSkill;
    }),
  addPosition: procedure
    .input(z.object({ positions: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const userPositions = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
        data: {
          positions: [...input.positions],
        },
      });
      return userPositions;
    }),
  deletePosition: procedure
    .input(z.object({ position: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userPositions = await ctx.prisma.user.findFirst({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
      });
      const updatedPositions = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
        data: {
          positions: userPositions?.positions.filter(
            (position) => position !== input.position
          ),
        },
      });
      return updatedPositions;
    }),
});
