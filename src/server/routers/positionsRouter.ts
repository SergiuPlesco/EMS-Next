import { procedure, router } from "../trpc";

export const positionsRouter = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.positions.findMany();
  }),
});
