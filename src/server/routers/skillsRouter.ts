import { z } from "zod";

import { procedure, router } from "../trpc";

export const skillsRouter = router({
  create: procedure
    .input(z.object({ skillTitle: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.skills.findFirst({
        where: {
          title: input.skillTitle,
        },
      });

      if (skill) throw new Error("skill already exists");

      const newSkill = await ctx.prisma.skills.create({
        data: {
          title: input.skillTitle,
          // @ts-ignore
          authorId: ctx?.session?.user?.id as string,
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
});
