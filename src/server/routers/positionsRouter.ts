import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { procedure, router } from "../trpc";

export const positionsRouter = router({
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newPosition = await ctx.prisma.position.upsert({
        where: {
          name: input.name,
        },
        create: {
          name: input.name,
        },
        update: {},
      });

      await ctx.prisma.userPosition.create({
        data: {
          positionId: newPosition.id,
          userId: ctx.session?.user.id,
          name: newPosition.name,
        },
      });
      return newPosition;
    }),
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.position.findMany();
  }),
  search: procedure
    .input(z.object({ searchQuery: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.searchQuery == "") return [];
      return ctx.prisma.position.findMany({
        where: {
          name: {
            startsWith: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
    }),
  delete: procedure
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const position = await ctx.prisma.position.findUnique({
        where: {
          id: input.positionId,
        },
      });
      const userWithPosition = await ctx.prisma.user.findFirst({
        where: {
          positions: {
            some: {
              name: position?.name,
            },
          },
        },
        include: {
          positions: true,
        },
      });
      if (userWithPosition) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `${position?.name} is used and can't be deleted.`,
        });
      }
      return await ctx.prisma.position.delete({
        where: {
          id: input.positionId,
        },
      });
    }),
});
