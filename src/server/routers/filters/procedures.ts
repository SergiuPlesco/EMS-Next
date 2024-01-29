import { procedure } from "../../trpc";

export const all = procedure.query(async ({ ctx }) => {
  const managers = await ctx.prisma.user.findMany({
    where: {
      managers: {
        some: {}, // Check if there is at least one manager assigned
      },
    },
  });
  const positions = await ctx.prisma.position.findMany();
  const projects = await ctx.prisma.project.findMany();
  const skills = await ctx.prisma.skill.findMany();

  return {
    hasManagers: Boolean(managers.length),
    hasPositions: Boolean(positions.length),
    hasProjects: Boolean(projects.length),
    hasSkills: Boolean(skills.length),
  };
});
