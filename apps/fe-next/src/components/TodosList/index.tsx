'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchTodos } from './helpers';

const TodosList = (): JSX.Element => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  return (
    <div className="p-2 bg-slate-200 rounded-lg my-4 max-w-5xl mx-auto">
      <h2>Client fetch</h2>

      <ul className=" list-disc pl-4 my-4">
        {data &&
          data.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
      </ul>

      {isLoading && (
        <p className="text-center text-sm  my-2 font-semibold text-green-700">
          loading...
        </p>
      )}
      {error && (
        <p className="text-center text-sm my-2 font-semibold text-red-700">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TodosList;
