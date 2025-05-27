"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = exports.publicProcedure = exports.router = void 0;
const server_1 = require("@trpc/server");
const zod_1 = require("zod");
const t = server_1.initTRPC.context().create();
exports.router = t.router;
exports.publicProcedure = t.procedure;
exports.appRouter = (0, exports.router)({
    todos: (0, exports.router)({
        // Get all todos
        getAll: exports.publicProcedure.query(async ({ ctx }) => {
            return await ctx.prisma.todo.findMany({
                orderBy: { createdAt: 'desc' },
            });
        }),
        // Get a todo by id
        getById: exports.publicProcedure
            .input(zod_1.z.object({ id: zod_1.z.number() }))
            .query(async ({ ctx, input }) => {
            return await ctx.prisma.todo.findUnique({
                where: { id: input.id },
            });
        }),
        // Create a new todo
        create: exports.publicProcedure
            .input(zod_1.z.object({
            title: zod_1.z.string().min(1),
            description: zod_1.z.string().optional(),
        }))
            .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.todo.create({
                data: {
                    title: input.title,
                    description: input.description,
                },
            });
        }),
        // Update a todo
        update: exports.publicProcedure
            .input(zod_1.z.object({
            id: zod_1.z.number(),
            title: zod_1.z.string().min(1).optional(),
            description: zod_1.z.string().optional(),
            completed: zod_1.z.boolean().optional(),
        }))
            .mutation(async ({ ctx, input }) => {
            const { id, ...data } = input;
            return await ctx.prisma.todo.update({
                where: { id },
                data,
            });
        }),
        // Delete a todo
        delete: exports.publicProcedure
            .input(zod_1.z.object({ id: zod_1.z.number() }))
            .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.todo.delete({
                where: { id: input.id },
            });
        }),
    }),
});
