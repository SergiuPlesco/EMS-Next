import { Prisma } from "@prisma/client";
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
      try {
        const newProject = await ctx.prisma.project.upsert({
          where: {
            name: input.name,
          },
          create: {
            name: input.name,
          },
          update: {},
        });

        return await ctx.prisma.userProject.create({
          data: {
            projectId: newProject.id,
            userId: ctx.session?.user.id,
            name: newProject.name,
            description: input.description,
            startDate: input.startDate,
            endDate: input.endDate,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // "Unique constraint failed on the {constraint}"
          // https://www.prisma.io/docs/orm/reference/error-reference#p2002
          if (error.code === "P2002") {
            throw {
              ...error,
              message: `${input.name} is already added.`,
            };
          } else {
            throw error;
          }
        }
      }
    }),
  getAll: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.userProject.findMany({
      where: {
        user: {
          id: ctx.session?.user.id,
        },
      },
      orderBy: {
        startDate: "desc",
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
  getById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.userProject.findFirst({
        where: {
          projectId: input.id,
          userId: ctx.session?.user.id,
        },
      });
    }),
  update: procedure
    .input(
      z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string(),
        startDate: z.date(),
        endDate: z.date().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.userProject.update({
        where: {
          name: input.name,
          userId: ctx.session?.user.id,
        },
        data: {
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),
});
