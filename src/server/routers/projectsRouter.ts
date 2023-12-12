import { z } from "zod";

import { procedure, router } from "../trpc";

export const projectRouter = router({
  create: procedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProject = await ctx.prisma.project.upsert({
        where: {
          name: input.name,
        },
        create: {
          name: input.name,
        },
        update: {},
      });
      await ctx.prisma.userProject.create({
        data: {
          projectId: newProject.id,
          userId: ctx.session?.user.id,
          name: newProject.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
      return newProject;
    }),
  getAll: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.userProject.findMany({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
      },
    });
  }),
  search: procedure
    .input(z.object({ searchQuery: z.string() }))
    .query(async ({ ctx, input }) => {
      if (input.searchQuery === "") return [];
      return await ctx.prisma.project.findMany({
        where: {
          name: {
            contains: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
    }),
});
