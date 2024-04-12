import { unstable_noStore as noStore } from 'next/cache';

import { fetchTodosSsr } from './helpers';

const TodosListSsr = async () => {
  noStore();
  const [data, error] = await fetchTodosSsr();

  return (
    <div className="p-2 bg-slate-200 rounded-lg my-4 max-w-5xl mx-auto">
      <h2>Server fetch</h2>

      <ul className=" list-disc pl-4 my-4">
        {data &&
          data.map((todo) => {
            return <li key={todo.id}>{todo.title}</li>;
          })}
      </ul>

      {error && (
        <p className="text-center text-sm my-2 font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};

export default TodosListSsr;
