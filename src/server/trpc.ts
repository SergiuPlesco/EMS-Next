import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

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

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
