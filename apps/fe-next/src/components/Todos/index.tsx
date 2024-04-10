'use client';

import { useState, useEffect } from 'react';

import type { Todo } from '../../types';

import { getErrorMessage } from '../../lib/common';

const fetchTodos = async (): Promise<[Todo[], null] | [null, string]> => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const payload = (await res.json()) as Todo[];

    return [payload.slice(0, 2), null];
  } catch (error) {
    return [null, getErrorMessage(error)];
  }
};

const useTodos = () => {
  const [data, setData] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    fetchTodos().then(([todos, errorMessage]) => {
      if (isMounted) {
        setData(todos);
        setError(errorMessage);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};

const Todos = (): JSX.Element => {
  const { data, error, isLoading } = useTodos();

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
          {error}
        </p>
      )}
    </div>
  );
};

export default Todos;
