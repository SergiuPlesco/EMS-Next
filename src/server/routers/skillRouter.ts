import { z } from "zod";

import { procedure, router } from "../trpc";

export const skillRouter = router({
  create: procedure
    .input(z.object({ skillTitle: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.skill.findFirst({
        where: {
          title: input.skillTitle,
          // @ts-ignore
          authorId: ctx?.session?.user?.id,
        },
      });

      if (skill) throw new Error("skill already exists");

      const newSkill = await ctx.prisma.skill.create({
        data: {
          title: input.skillTitle,
          // @ts-ignore
          authorId: ctx?.session?.user?.id as string,
        },
      });
      return newSkill;
    }),
  all: procedure.query(({ ctx }) => {
    return ctx.prisma.skill.findMany();
  }),
  searchSkill: procedure
    .input(z.object({ searchQuery: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.searchQuery == "") return [];
      return ctx.prisma.skill.findMany({
        where: {
          title: {
            startsWith: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
    }),
  skillByUserId: procedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        // @ts-ignore
        id: ctx.session?.user?.id,
      },
    });

    if (!user) throw new Error("This user does not exist");

    return await ctx.prisma.skill.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }),
  fetchTopSkills: procedure.query(async ({ ctx }) => {
    // @ts-ignore
    if (!ctx.session?.user?.id) return;

    const topSkills = await ctx.prisma.skill.findMany({
      where: {
        user: {
          // @ts-ignore
          id: ctx.session.user.id,
        },
      },
      take: 3,
      orderBy: {
        rating: "desc",
      },
    });

    return topSkills;
  }),

  updateRating: procedure
    .input(z.object({ skillId: z.number(), ratingId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const updatedSkill = await ctx.prisma.skill.updateMany({
        where: {
          id: input.skillId,
          // @ts-ignore
          authorId: ctx.session?.user?.id,
        },
        data: {
          rating: input.ratingId,
        },
      });

      return updatedSkill;
    }),
});
