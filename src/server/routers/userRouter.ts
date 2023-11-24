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
      const deletedSkill = await ctx.prisma.user.update({
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
      return deletedSkill;
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

  addPosition: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const position = await ctx.prisma.position.findUnique({
        where: {
          name: input.name,
        },
      });
      if (!position) return;
      const userPosition = await ctx.prisma.userPosition.create({
        data: {
          positionId: position.id,
          userId: ctx.session?.user.id,
          name: position.name,
        },
      });
      const userPositions = await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          positions: {
            connect: {
              id: userPosition.id,
            },
          },
        },
      });
      return userPositions;
    }),

  deletePosition: procedure
    .input(z.object({ positionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedPosition = await ctx.prisma.user.update({
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
      return deletedPosition;
    }),
  getPositions: procedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user?.id,
      },
    });

    if (!user) throw new Error("This user does not exist");

    const allUserPositions = await ctx.prisma.userPosition.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });

    return allUserPositions;
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
