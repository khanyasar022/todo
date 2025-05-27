import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { z } from 'zod';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  todos: router({
    // Get all todos
    getAll: publicProcedure.query(async ({ ctx }) => {
      return await ctx.prisma.todo.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }),
  }),
});

export type AppRouter = typeof appRouter;