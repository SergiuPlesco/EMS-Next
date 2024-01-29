import { z } from "zod";

import { adminProcedure, router } from "../trpc";

export const adminRouter = router({
  assignRole: adminProcedure
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
  deleteUserById: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.user.delete({
        where: {
          id: input.userId,
        },
      });
    }),
});
