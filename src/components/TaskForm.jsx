import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask } from '../features/tasks/taskSlice';
import { v4 as uuid } from 'uuid';

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const [task, setTask] = useState({
    title: '',
    description: '',
  });

  const handleChange = (event) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
          completed: false,
        }),
      );
    }

    navigate('/');
  };

  useEffect(() => {
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-cyan-500 max-w-sm p-4 rounded-md"
      >
        <label htmlFor="title" className="block text-xs font-bold mb-1">
          Task:
        </label>
        <input
          name="title"
          type="text"
          placeholder="title"
          onChange={handleChange}
          value={task.title}
          className="w-full p-2 rounded-md mb-2"
        />
        <label htmlFor="description" className="block text-xs font-bold mb-1">
          Description:
        </label>
        <textarea
          name="description"
          placeholder="description"
          onChange={handleChange}
          value={task.description}
          className="w-full p-2 rounded-md mb-2"
        ></textarea>
        <button className="bg-green-600 text-white text-bold px-2 py-1 rounded-md">
          Save Task
        </button>
      </form>
    </>
  );
};

export default TaskForm;
