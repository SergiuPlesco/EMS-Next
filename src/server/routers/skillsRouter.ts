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
  search: procedure
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
      const skill = await ctx.prisma.skill.findUnique({
        where: {
          id: input.skillId,
        },
      });

      const userWithSkill = await ctx.prisma.user.findFirst({
        where: {
          skills: {
            some: {
              name: skill?.name,
            },
          },
        },
        include: {
          skills: true,
        },
      });

      if (userWithSkill) {
        throw new TRPCError({
          code: "CONFLICT",
          message: `${skill?.name} is used and can't be deleted.`,
        });
      }
      return await ctx.prisma.skill.delete({
        where: {
          id: input.skillId,
        },
      });
    }),
});
