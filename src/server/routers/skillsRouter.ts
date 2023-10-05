import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { procedure, router } from "../trpc";

export const skillsRouter = router({
  create: procedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newSkill = await ctx.prisma.skills.create({
        data: {
          title: input.title,
        },
      });
      return newSkill;
    }),
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.skills.findMany();
  }),
  searchSkill: procedure
    .input(z.object({ searchQuery: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.searchQuery == "") return [];
      return ctx.prisma.skills.findMany({
        where: {
          title: {
            startsWith: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
    }),
  delete: procedure
    .input(z.object({ skillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.positions.findUnique({
        where: {
          id: input.skillId,
        },
      });
      const isPositionUsed = await ctx.prisma.user.findFirst({
        where: {
          positions: {
            some: {
              title: skill?.title,
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
          message: "The skill is in use and can't be deleted.",
        });
      }
      return await ctx.prisma.positions.delete({
        where: {
          id: input.skillId,
        },
      });
    }),
});
