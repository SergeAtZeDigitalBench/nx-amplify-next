import TodosSsr from '../../components/Todos/TodosSsr';
import Todos from '../../components/Todos';

const TodosPage = async () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">Todos</h1>
      <TodosSsr />
      <Todos />
    </>
  );
};

export default TodosPage;
