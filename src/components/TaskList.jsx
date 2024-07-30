import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-4/6">
      <header className="flex justify-between place-items-center py-4">
        <h2>TaskList {tasks.length} </h2>
        <Link
          to="/create-task"
          className="bg-indigo-400 px-2 py-1 rounded-sm text-sm text-white"
        >
          Create Task
        </Link>
      </header>

      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-neutral-800 p-4 text-white rounded-md"
          >
            <header className="flex justify-between">
              <h3>{task.title}</h3>
              <div className="flex gap-x-1">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-amber-600 px-2 py-1 rounded-sm text-xs"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-600 px-2 py-1 rounded-sm text-xs"
                >
                  Delete
                </button>
              </div>
            </header>

            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
