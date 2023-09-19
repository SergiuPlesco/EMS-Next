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
  updateSKills: procedure
    .input(
      z.object({
        skills: z.array(
          z.object({
            title: z.string(),
            rating: z.number(),
            createdAt: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newSkills = input.skills.map((skill) => ({
        title: skill.title,
        rating: skill.rating,
        createdAt: new Date(skill.createdAt),
      }));

      const userSkills = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx?.session?.user.id,
        },
        data: {
          skills: {
            deleteMany: {},
            createMany: {
              data: [...newSkills],
            },
          },
        },
      });

      return userSkills;
    }),
  // not used
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
  getSkills: procedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        // @ts-ignore
        id: ctx.session?.user?.id,
      },
      // select: {
      //   skills: {
      //     orderBy: {
      //       createdAt: "asc",
      //     },
      //   },
      // },
    });

    if (!user) throw new Error("This user does not exist");

    return await ctx.prisma.userSkill.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
  }),
  getTopSkills: procedure.query(async ({ ctx }) => {
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
  // check if needed
  updateRating: procedure
    .input(z.object({ skillId: z.number(), rating: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const updatedSkill = await ctx.prisma.userSkill.update({
        where: {
          id: input.skillId,
          // @ts-ignore
          authorId: ctx.session?.user?.id,
        },
        data: {
          rating: input.rating,
        },
      });

      return updatedSkill;
    }),
  updatePosition: procedure
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
            deleteMany: {},
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
        // @ts-ignore
        authorId: ctx.session?.user.id,
      },
    });
  }),
  // not used
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
