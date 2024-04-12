import { getErrorMessage } from '../../lib/common';

import type { Todo } from '../../types';

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_TO_MOCK}/todos`);

  if (!res.ok) {
    const errorPayload = (await res.json()) as { error?: string };
    throw new Error(errorPayload.error || res.statusText);
  }

  const payload = (await res.json()) as Todo[];

  return payload;
};

export const fetchTodosSsr = async (): Promise<
  [Todo[], null] | [null, string]
> => {
  try {
    const payload = await fetchTodos();

    return [payload, null];
  } catch (error) {
    return [null, getErrorMessage(error, 'fetch error')];
  }
};
