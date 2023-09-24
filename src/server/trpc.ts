import { inferAsyncReturnType,initTRPC } from "@trpc/server";
import superjson from "superjson";

import { createContext } from "./context";

const t = initTRPC
  .context<inferAsyncReturnType<typeof createContext>>()
  .create({
    transformer: superjson,
    errorFormatter: ({ shape }) => {
      return shape;
    },
  });

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;
