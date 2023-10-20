import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { procedure, router } from "../trpc";

export const skillsRouter = router({
  create: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const newSkill = await ctx.prisma.skill.upsert({
        where: {
          name: input.name,
        },
        create: {
          name: input.name,
        },
        update: {},
      });
      await ctx.prisma.userSkill.create({
        data: {
          skillId: newSkill.id,
          userId: ctx.session?.user.id as string,
          rating: 5,
          name: newSkill.name,
          createdAt: new Date(),
        },
      });
      return newSkill;
    }),
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.skill.findMany();
  }),
  searchSkill: procedure
    .input(z.object({ searchQuery: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.searchQuery == "") return [];
      return ctx.prisma.skill.findMany({
        where: {
          name: {
            startsWith: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
    }),
  delete: procedure
    .input(z.object({ skillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.position.findUnique({
        where: {
          id: input.skillId,
        },
      });
      const isPositionUsed = await ctx.prisma.user.findFirst({
        where: {
          positions: {
            some: {
              name: skill?.name,
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
      return await ctx.prisma.position.delete({
        where: {
          id: input.skillId,
        },
      });
    }),
});
