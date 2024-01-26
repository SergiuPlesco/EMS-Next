import { Prisma } from "@prisma/client";
import { z } from "zod";

import { procedure, router } from "../trpc";

export const userRouter = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      include: {
        positions: true,
      },
    });
  }),
  search: procedure
    .input(
      z.object({
        searchQuery: z
          .string()
          .max(
            50,
            "Search querry cannot be longer than 50 characters. Please shorten the search query and try again."
          ),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.searchQuery === "") return [];
      const result = await ctx.prisma.user.findMany({
        where: {
          name: {
            contains: input.searchQuery,
            mode: "insensitive",
          },
        },
      });
      const excludedLoggedUser = result.filter(
        (user) => user.id !== ctx.session?.user.id
      );
      return excludedLoggedUser;
    }),
  filter: procedure
    .input(
      z.object({
        searchQuery: z
          .string()
          .max(
            50,
            "Search querry cannot be longer than 50 characters. Please shorten the search query and try again."
          ),
        page: z.number(),
        perPage: z.number(),
        availability: z.array(z.enum(["FULLTIME", "PARTTIME", "NOTAVAILABLE"])),
        skills: z.array(
          z
            .string()
            .max(
              50,
              "Skill name cannot be longer than 50 characters. Please shorten the skill name and try again."
            )
        ),
        projects: z.array(
          z
            .string()
            .max(
              50,
              "Project name cannot be longer than 50 characters. Please shorten the project name and try again."
            )
        ),
      })
    )
    .query(async ({ ctx, input }) => {
      const skipPages = input.perPage * (input.page - 1);
      const where: Prisma.UserWhereInput = {
        availability: {
          in:
            input.availability.length > 0
              ? input.availability
              : ["FULLTIME", "PARTTIME", "NOTAVAILABLE"],
        },
        ...(input.skills.length > 0 && {
          skills: {
            some: {
              name: {
                in: input.skills,
              },
            },
          },
        }),
        ...(input.projects.length > 0 && {
          projects: {
            some: {
              name: {
                in: input.projects,
              },
            },
          },
        }),
        OR: [
          {
            name: {
              contains: input.searchQuery,
              mode: "insensitive",
            },
          },
          {
            skills: {
              some: {
                name: {
                  contains: input.searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            positions: {
              some: {
                name: {
                  contains: input.searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            projects: {
              some: {
                name: {
                  contains: input.searchQuery,
                  mode: "insensitive",
                },
              },
            },
          },
        ],
      };

      const include: Prisma.UserInclude = {
        positions: true,
      };
      const [users, totalUsers] = await ctx.prisma.$transaction([
        ctx.prisma.user.findMany({
          skip: skipPages,
          take: input.perPage,
          where,
          include,
        }),

        ctx.prisma.user.findMany({
          where,
          include,
        }),
      ]);

      return {
        users,
        pagination: {
          currentPage: input.page,
          perPage: input.perPage,
          totalPages: Math.ceil(totalUsers.length / input.perPage),
        },
      };
    }),
  getById: procedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: input.userId,
        },
        include: {
          positions: true,
          managers: true,
          skills: {
            orderBy: {
              createdAt: "asc",
            },
          },
          projects: {
            orderBy: {
              startDate: "desc",
            },
          },
        },
      });
    }),
  getLoggedUser: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session?.user.id,
      },
      include: {
        positions: true,
        managers: true,
        skills: {
          orderBy: {
            createdAt: "asc",
          },
        },
        projects: {
          orderBy: {
            startDate: "desc",
          },
        },
      },
    });
  }),
  userInfo: procedure
    .input(
      z.object({
        phone: z
          .string()
          .length(
            9,
            "Please ensure it is 9 digits long and follows the format 0xxxxxxxx."
          )
          .regex(
            new RegExp("[0-9]{9}"),
            "Please ensure it is 9 digits long and follows the format 0xxxxxxxx."
          ),
        employmentDate: z.date().nullable(),
        availability: z.enum(["FULLTIME", "PARTTIME", "NOTAVAILABLE"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const phone = await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          phone: input.phone,
          employmentDate: input.employmentDate,
          availability: input.availability,
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
        name: z
          .string()
          .max(
            50,
            "Skill name cannot be longer than 50 characters. Please shorten the skill name and try again."
          ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const skill = await ctx.prisma.skill.findUnique({
          where: {
            name: input.name,
          },
        });

        if (!skill) {
          throw new Error(`${input.name} does not exist.`);
        }

        const existingUserSkill = await ctx.prisma.userSkill.findFirst({
          where: {
            userId: ctx.session?.user.id,
            skillId: skill.id,
          },
        });

        if (existingUserSkill) {
          throw new Error(`${input.name} is already added.`);
        }

        const userSkill = await ctx.prisma.userSkill.create({
          data: {
            skillId: skill.id,
            userId: ctx.session?.user.id,
            name: skill.name,
            rating: 5,
          },
        });

        await ctx.prisma.user.update({
          where: {
            id: ctx.session?.user.id,
          },
          data: {
            skills: {
              connect: {
                id: userSkill.id,
              },
            },
          },
        });

        return userSkill;
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // Prisma error handling
          if (error.code === "P2002") {
            throw new Error(`${input.name} is already added.`);
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
    }),
  deleteSkill: procedure
    .input(z.object({ userSkillId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deleteSkill = await ctx.prisma.userSkill.delete({
        where: {
          id: input.userSkillId,
        },
      });

      const userWithSkill = await ctx.prisma.user.findFirst({
        where: {
          skills: {
            some: {
              skillId: deleteSkill.skillId,
            },
          },
        },
      });

      if (!userWithSkill && deleteSkill.skillId) {
        await ctx.prisma.skill.delete({
          where: {
            id: deleteSkill.skillId,
          },
        });
      }
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
  updateRating: procedure
    .input(
      z.object({ skillId: z.number(), rating: z.number().min(5).max(100) })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedSkill = await ctx.prisma.userSkill.update({
        where: {
          id: input.skillId,
          userId: ctx.session?.user?.id,
        },
        data: {
          rating: input.rating,
        },
      });

      return updatedSkill;
    }),

  addPosition: procedure
    .input(
      z.object({
        name: z
          .string()
          .max(
            50,
            "Position name cannot be longer than 50 characters. Please shorten the position name and try again."
          ),
      })
    )
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
    .input(z.object({ userPositionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedPosition = await ctx.prisma.userPosition.delete({
        where: {
          id: input.userPositionId,
        },
      });
      const userWithPosition = await ctx.prisma.user.findFirst({
        where: {
          positions: {
            some: {
              positionId: deletedPosition.positionId,
            },
          },
        },
      });

      if (!userWithPosition && deletedPosition.positionId) {
        await ctx.prisma.position.delete({
          where: {
            id: deletedPosition.positionId,
          },
        });
      }
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
  addManager: procedure
    .input(
      z.object({
        name: z
          .string()
          .max(
            50,
            "Manager name cannot be longer than 50 characters. Please shorten the manager name and try again."
          ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          name: input.name,
        },
      });

      if (!user) return;

      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          managers: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }),
  deleteManager: procedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          name: input.name,
        },
      });

      if (!user) return;

      await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          managers: {
            disconnect: {
              id: user.id,
            },
          },
        },
      });
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
  deleteProject: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          projects: {
            delete: {
              id: input.id,
            },
          },
        },
      });
    }),
  assignRole: procedure
    .input(z.object({ userId: z.string(), role: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: {
          role: input.role,
        },
      });
    }),
  deleteById: procedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.delete({
        where: {
          id: input.userId,
        },
      });
    }),
});
