import Link from "next/link"; // Import Link for navigation
import { Todo } from "../types"; // Import the shared Todo type

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg bg-background dark:border-gray-700">
      <div className="flex items-center gap-3 flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onUpdate(todo.id, !todo.completed)}
          className="w-5 h-5 cursor-pointer form-checkbox text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
        />
        <div className={`${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-foreground'} flex-grow`}>
          <h3 className="font-medium">{todo.title}</h3>
          {todo.description && <p className="text-sm text-gray-600 dark:text-gray-300">{todo.description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4 flex-shrink-0">
        <Link href={`/edit/${todo.id}`} passHref>
          <button
            className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-500 dark:hover:text-white rounded-full"
            aria-label="Edit todo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
        </Link>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-500 dark:hover:text-white rounded-full"
          aria-label="Delete todo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      </div>
    </div>
  );
};