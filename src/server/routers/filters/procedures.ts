import { procedure } from "../../trpc";

export const all = procedure.query(async ({ ctx }) => {
  const members = await ctx.prisma.user.findMany({
    include: {
      members: true,
    },
  });
  const managers = await ctx.prisma.user.findMany({
    include: {
      managers: true,
    },
  });
  const positions = await ctx.prisma.position.findMany();
  const projects = await ctx.prisma.project.findMany();

  return {
    hasMembers: members,
    hasManagers: Boolean(managers.length),
    hasPositions: Boolean(positions.length),
    hasProjects: Boolean(projects.length),
  };
});
