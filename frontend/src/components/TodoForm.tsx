import { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string, description: string) => void;
}

export const TodoForm = ({ onSubmit }: TodoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title, description);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mb-6 border rounded-lg bg-background dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-foreground">Add New Todo</h2>
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
          placeholder="Enter todo title"
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
          placeholder="Enter todo description"
          rows={3}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
      >
        Add Todo
      </button>
    </form>
  );
};
