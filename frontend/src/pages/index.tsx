// Removed 'use client'; as it's not needed for Pages Router by default for pages.

// import { useEffect } from 'react'; // Was already removed
import { TodoItem } from '../components/TodoItem';
import { TodoForm } from '../components/TodoForm';
import { trpc } from '../utils/trpc';
import { Todo } from '../types';
import Head from 'next/head'; // Import Head for title

export default function HomePage() { // Renamed component to avoid conflict if any
  const { data: todos, isLoading, error: fetchError, refetch } = trpc.todos.getAll.useQuery();
  const createTodoMutation = trpc.todos.create.useMutation();
  const updateTodoMutation = trpc.todos.update.useMutation();
  const deleteTodoMutation = trpc.todos.delete.useMutation();

  const handleAddTodo = async (title: string, description: string) => {
    try {
      await createTodoMutation.mutateAsync({
        title,
        description: description || undefined,
      });
      refetch();
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleUpdateTodo = async (id: number, completed: boolean) => {
    try {
      await updateTodoMutation.mutateAsync({
        id,
        completed,
      });
      refetch();
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodoMutation.mutateAsync({ id });
      refetch();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const error = fetchError ? 'Failed to load todos. Please try again later.' : (createTodoMutation.error || updateTodoMutation.error || deleteTodoMutation.error)?.message || null;

  return (
    <>
      <Head>
        <title>Todo Application</title>
        <meta name="description" content="A simple Todo application built with Next.js, tRPC, and Prisma" />
      </Head>
      <main className="container mx-auto px-4 py-8 max-w-3xl bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Todo Application</h1>
        
        <TodoForm onSubmit={handleAddTodo} />
        
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="text-center py-4 text-foreground">Loading todos...</div>
        ) : !todos || todos.length === 0 ? (
          <div className="text-center py-4 text-gray-500 dark:text-gray-400">
            No todos yet. Add a new one to get started!
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-foreground">Your Todos</h2>
            {Array.isArray(todos) && todos.map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
} 