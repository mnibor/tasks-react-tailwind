import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Task description 1',
    completed: false,
  },
  {
    id: '2',
    title: 'Task 2',
    description: 'Task description 2',
    completed: false,
  },
];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const { id, title, description } = action.payload;
      const editableTask = state.find((task) => task.id === id);
      if (editableTask) {
        editableTask.title = title;
        editableTask.description = description;
      }
    },
    deleteTask: (state, action) => {
      const taskfound = state.find((task) => task.id === action.payload);
      if (taskfound) {
        state.splice(state.indexOf(taskfound), 1);
      }
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
