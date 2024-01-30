import { z } from "zod";

import { procedure } from "../../trpc";

export const addTeamMember = procedure
  .input(
    z.object({
      name: z
        .string()
        .max(
          50,
          "Team member name cannot be longer than 50 characters. Please shorten the teamm member name and try again."
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
        members: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  });
export const deleteTeamMember = procedure
  .input(z.object({ userId: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: input.userId,
      },
    });

    if (!user) return;

    await ctx.prisma.user.update({
      where: {
        id: ctx.session?.user.id,
      },
      data: {
        members: {
          disconnect: {
            id: user.id,
          },
        },
      },
    });
  });
