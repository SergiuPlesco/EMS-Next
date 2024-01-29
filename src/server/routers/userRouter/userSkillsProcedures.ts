import { Prisma } from "@prisma/client";
import { z } from "zod";

import { procedure } from "../../trpc";

export const addSkill = procedure
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
  });

export const deleteSkill = procedure
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
  });
