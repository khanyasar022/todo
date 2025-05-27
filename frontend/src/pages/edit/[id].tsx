// Removed 'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Changed from next/navigation
import { trpc } from '../../utils/trpc'; // Adjusted path relative to pages directory
import Link from 'next/link';
import Head from 'next/head'; // Import Head for title

export default function EditTodoPage() {
  const router = useRouter();
  const { id: queryId } = router.query; // Get id from router.query
  const id = queryId ? Number(queryId) : null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the todo item when the component mounts or id changes
  const { data: todo, error: fetchError, isLoading: isFetchingTodo } = trpc.todos.getById.useQuery(
    { id: id! }, // Non-null assertion, assuming id will be present for this page
    { enabled: id !== null } // Only run query if id is available
  );
  
  const updateTodoMutation = trpc.todos.update.useMutation();

  useEffect(() => {
    if (router.isReady) { // Ensure router query is available
      if (todo) {
        setTitle(todo.title);
        setDescription(todo.description || '');
        setPageIsLoading(false);
      } else if (id !== null && !isFetchingTodo && !todo && !fetchError) { // Added !fetchError condition
        setError('Todo not found or you might not have access.');
        setPageIsLoading(false);
      }
      if (fetchError) {
        setError(fetchError.message);
        setPageIsLoading(false);
      }
    }
  }, [todo, id, isFetchingTodo, fetchError, router.isReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateTodoMutation.mutateAsync({
        id,
        title,
        description: description || undefined,
      });
      router.push('/');
    } catch (err) {
      let message = 'Failed to update todo. Please try again.';
      if (err instanceof Error) {
        message = err.message;
      }
      setError(message);
      console.error('Failed to update todo:', err);
    }
  };

  if (!router.isReady || pageIsLoading) { // Check router.isReady
    return <div className="container mx-auto px-4 py-8 max-w-xl text-center text-foreground">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-xl text-center text-red-500">
        <Head><title>Error Editing Todo</title></Head>
        <p>{error}</p>
        <Link href="/" className="text-blue-500 hover:underline mt-4 block">Go back to Home</Link>
      </div>
    );
  }
  
  // This condition might be redundant due to the useEffect logic but kept for safety
  if (!todo && !pageIsLoading) {
    return (
        <div className="container mx-auto px-4 py-8 max-w-xl text-center text-foreground">
            <Head><title>Todo Not Found</title></Head>
            <p>Todo not found.</p>
            <Link href="/" className="text-blue-500 hover:underline mt-4 block">Go back to Home</Link>
        </div>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Todo - {title || 'Loading...'}</title>
      </Head>
      <main className="container mx-auto px-4 py-8 max-w-xl bg-background text-foreground">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Edit Todo</h1>
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-background dark:border-gray-700">
          <div className="mb-4">
            <label htmlFor="title" className="block mb-1 font-medium text-foreground">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground dark:border-gray-600 dark:focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 font-medium text-foreground">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground dark:border-gray-600 dark:focus:ring-blue-400"
              rows={4}
            />
          </div>
          <div className="flex justify-end gap-4">
              <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:focus:ring-gray-500"
              >
                  Cancel
              </button>
              <button
                  type="submit"
                  disabled={updateTodoMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400 disabled:opacity-50"
              >
                  {updateTodoMutation.isPending ? 'Updating...' : 'Update Todo'}
              </button>
          </div>
        </form>
      </main>
    </>
  );
} 