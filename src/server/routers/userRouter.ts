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
  addSKill: procedure
    .input(z.object({ skillTitle: z.string(), skillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const addedSkill = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx?.session?.user.id,
        },
        data: {
          skills: {
            update: {
              where: {
                id: 5,
              },
              data: {
                title: input.skillTitle,
              },
            },
          },
        },
      });
      return addedSkill;
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
  skillByUserId: procedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        // @ts-ignore
        id: ctx.session?.user?.id,
      },
    });

    if (!user) throw new Error("This user does not exist");

    return await ctx.prisma.userSkill.findMany({
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

    const topSkills = await ctx.prisma.userSkill.findMany({
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
      const updatedSkill = await ctx.prisma.userSkill.updateMany({
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
  addPosition: procedure
    .input(z.object({ positions: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const newPostions = input.positions.map((position) => ({
        title: position,
      }));
      const userPositions = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
        data: {
          positions: {
            createMany: {
              data: [...newPostions],
            },
          },
        },
      });
      return userPositions;
    }),
  getPositions: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.userPosition.findMany({
      where: {
        authorId: ctx.session?.user.id,
      },
    });
  }),
  deletePosition: procedure
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const updatedPositions = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
        data: {
          positions: {
            delete: {
              id: input.positionId,
            },
          },
        },
      });
      return updatedPositions;
    }),
});
