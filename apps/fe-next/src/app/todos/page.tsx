import { Suspense } from 'react';

import TodosSsr from '../../components/Todos/TodosSsr';
import LoadingList from '../../components/LoadingList';
import Todos from '../../components/Todos';

const TodosPage = async () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Todos</h1>
      <Suspense fallback={<LoadingList />}>
        <TodosSsr />
      </Suspense>
      <Todos />
    </>
  );
};

export default TodosPage;
