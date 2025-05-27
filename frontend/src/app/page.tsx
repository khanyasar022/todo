'use client';

import { useEffect, useState } from 'react';
import { TodoItem } from '../components/TodoItem';
import { TodoForm } from '../components/TodoForm';
import { trpc } from '../utils/trpc';
import { Todo } from '../types';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const fetchedTodos = await trpc.todos.getAll.query();
      setTodos(fetchedTodos);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
      setError('Failed to load todos. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (title: string, description: string) => {
    try {
      const newTodo = await trpc.todos.create.mutate({
        title,
        description: description || undefined,
      });
      setTodos([newTodo, ...todos]);
    } catch (err) {
      console.error('Failed to add todo:', err);
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (id: number, completed: boolean) => {
    try {
      await trpc.todos.update.mutate({
        id,
        completed,
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (err) {
      console.error('Failed to update todo:', err);
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await trpc.todos.delete.mutate({ id });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
      setError('Failed to delete todo. Please try again.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Todo Application</h1>
      
      <TodoForm onSubmit={handleAddTodo} />
      
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-4">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No todos yet. Add a new one to get started!
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
          {todos.map((todo) => (
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
  );
}
