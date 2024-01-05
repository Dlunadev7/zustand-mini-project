import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {

  const taskDone = useTaskStore((state) => state.getTaskByStatus('done'));
  const taskInProgress = useTaskStore((state) => state.getTaskByStatus('in-progress'));
  const taskOpen = useTaskStore((state) => state.getTaskByStatus('open'));

  // console.log(task);

  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <JiraTasks title='Pendientes' task={taskOpen} value='open' />
          
          <JiraTasks title='Avanzando' task={taskInProgress} value='in-progress' />
          
          <JiraTasks title='Terminadas' task={taskDone} value='done' />

      </div>

      



    </>
  );
};