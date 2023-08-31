import { procedure, router } from "../trpc";

export const positionRouter = router({
  all: procedure.query(async ({ ctx }) => {
    return await ctx.prisma.position.findMany();
  }),
});
