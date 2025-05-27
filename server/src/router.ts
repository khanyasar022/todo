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
    
    // Get a todo by id
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        return await ctx.prisma.todo.findUnique({
          where: { id: input.id },
        });
      }),
      
    // Create a new todo
    create: publicProcedure
      .input(
        z.object({
          title: z.string().min(1),
          description: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        return await ctx.prisma.todo.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      }),
      
    // Update a todo
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          title: z.string().min(1).optional(),
          description: z.string().optional(),
          completed: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...data } = input;
        return await ctx.prisma.todo.update({
          where: { id },
          data,
        });
      }),
      
    // Delete a todo
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await ctx.prisma.todo.delete({
          where: { id: input.id },
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;