import { Prisma } from "@prisma/client";
import { z } from "zod";

import { procedure, router } from "../trpc";

export const positionsRouter = router({
  create: procedure
    .input(
      z.object({
        name: z
          .string()
          .max(
            50,
            "Position name cannot be longer than 50 characters. Please shorten the position name and try again.",
          ),
      }),
    )
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
    return await ctx.prisma.position.findMany({
      orderBy: { name: "asc" },
    });
  }),
  search: procedure
    .input(
      z.object({
        searchQuery: z
          .string()
          .max(
            50,
            "Search querry cannot be longer than 50 characters. Please shorten the search query and try again.",
          ),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (input.searchQuery == "") return [];
      return await ctx.prisma.position.findMany({
        where: {
          name: {
            contains: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
    }),
  delete: procedure
    .input(z.object({ positionId: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.position.delete({
          where: {
            id: input.positionId,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // "Foreign key constraint failed on the field: {field_name}"
          // https://www.prisma.io/docs/orm/reference/error-reference#p2003
          if (error.code === "P2003") {
            throw {
              ...error,
              message: `${input.name} is used and can't be deleted.`,
            };
          } else {
            throw error;
          }
        }
      }
    }),
});
