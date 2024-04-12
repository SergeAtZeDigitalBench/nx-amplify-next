'use client';

import { useState, useEffect } from 'react';

import type { Todo } from '../../types';

import { getErrorMessage } from '../../lib/common';

const fetchTodosBrowser = async (): Promise<Todo[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_TO_MOCK}/todos`);

  if (!res.ok) {
    const errorPayload = (await res.json()) as { error?: string };
    throw new Error(errorPayload.error || res.statusText);
  }

  const payload = (await res.json()) as Todo[];

  return payload;
};

const useTodos = () => {
  const [data, setData] = useState<Todo[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    fetchTodosBrowser()
      .then((todos) => {
        if (isMounted) {
          setData(todos);
        }
      })
      .catch((err) => {
        setError(getErrorMessage(err));
      })
      .finally(() => {
        setIsLoading(false);
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
