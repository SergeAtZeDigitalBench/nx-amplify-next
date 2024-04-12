import { Suspense } from 'react';

import TodosListSsr from '../../components/TodosList/TodosListSsr';
import LoadingList from '../../components/LoadingList';
import Todos from '../../components/TodosList';

const TodosPage = async () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Todos</h1>
      <Suspense fallback={<LoadingList />}>
        <TodosListSsr />
      </Suspense>
      <Todos />
    </>
  );
};

export default TodosPage;
