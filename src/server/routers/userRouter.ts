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
  getLoggedUser: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id,
      },
    });
  }),
  addPhone: procedure
    .input(
      z.object({
        phone: z.string().length(9),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const phone = await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          phone: input.phone,
        },
      });
      return phone;
    }),
  getPhone: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
      select: {
        phone: true,
      },
    });
  }),
  addSKill: procedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.skill.findUnique({
        where: {
          name: input.name,
        },
      });
      if (!skill) return;
      const userSkill = await ctx.prisma.userSkill.create({
        data: {
          skillId: skill?.id,
          userId: ctx.session?.user.id,
          name: skill?.name,
          rating: 5,
        },
      });

      const userSkills = await ctx.prisma.user.update({
        where: {
          // @ts-ignore
          id: ctx.session?.user.id,
        },
        data: {
          skills: {
            connect: {
              id: userSkill?.id,
            },
          },
        },
      });

      return userSkills;
    }),
  deleteSkill: procedure
    .input(z.object({ skillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deleteSkill = await ctx.prisma.user.update({
        where: {
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
          userId: ctx.session?.user?.id,
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
        name: position,
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
        userId: ctx.session?.user.id,
      },
    });
  }),
  // not used
  deletePosition: procedure
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const updatedPositions = await ctx.prisma.user.update({
        where: {
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
  updateManagers: procedure
    .input(z.object({ managerIds: z.array(z.object({ id: z.string() })) }))
    .mutation(async ({ ctx, input }) => {
      if (input.managerIds.length === 0) {
        return await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.id,
          },
          data: {
            managers: {
              set: [],
            },
          },
        });
      } else {
        await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.id,
          },
          data: {
            managers: {
              set: [],
              connect: input.managerIds,
            },
          },
        });
      }
    }),
  getManagers: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id,
      },
      select: {
        managers: true,
      },
    });
  }),
});
