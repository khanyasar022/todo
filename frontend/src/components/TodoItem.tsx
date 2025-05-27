interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export const TodoItem = ({ todo, onUpdate, onDelete }: TodoItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 border rounded-lg bg-white">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onUpdate(todo.id, !todo.completed)}
          className="w-5 h-5 cursor-pointer"
        />
        <div className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
          <h3 className="font-medium">{todo.title}</h3>
          {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-red-500 hover:bg-red-50 rounded-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </button>
    </div>
  );
};