import { http, HttpResponse, HttpResponseResolver } from 'msw';

import type { Todo } from '../../types';

const todosResolver: HttpResponseResolver<never, never, Todo[]> = ({
  request,
  params,
  cookies,
}) => {
  return HttpResponse.json([
    {
      userId: 1112,
      id: 116,
      title: 'Mock Title One',
      completed: true,
    },
    {
      userId: 1111,
      id: 117,
      title: 'Mock Title Two',
      completed: true,
    },
  ]);
};

const petsResolver: HttpResponseResolver = ({ request, params, cookies }) => {
  return HttpResponse.json({ data: ['Tom', 'Jerry', 'Spike'] });
};

export const handlers = [
  http.get('https://api.example.com/pets', petsResolver),
  http.get('/pets', petsResolver),
  http.get('https://jsonplaceholder.typicode.com/todos', todosResolver),
  http.get('/todos', todosResolver),
];
