import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { USER_ROLES } from "@/constants/common";

import { createContext } from "./context";

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create({
    transformer: superjson,
    errorFormatter: ({ shape, error }) => {
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === "BAD_REQUEST" && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      };
    },
  });

const isAuthed = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }
  return opts.next({ ctx });
});

const isAdmin = t.middleware(async (opts) => {
  const { ctx } = opts;
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }
  if (ctx.session.user.role !== USER_ROLES.ADMIN) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authorized",
    });
  }
  return opts.next({ ctx });
});

export const router = t.router;
export const procedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAdmin);
