import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('kanban-board');
  return saved ? JSON.parse(saved) : {
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Todo',
        taskIds: [],
      },
    },
    tasks: {},
    columnOrder: ['column-1'],
    theme: 'light',
  };
};

const initialState = loadFromLocalStorage();

const saveToLocalStorage = (state) => {
  localStorage.setItem('kanban-board', JSON.stringify(state));
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { columnId, content } = action.payload;
      const taskId = `task-${Date.now()}`;
      state.tasks[taskId] = { id: taskId, content };
      state.columns[columnId].taskIds.push(taskId);
      saveToLocalStorage(state);
    },
    deleteTask: (state, action) => {
      const { taskId, columnId } = action.payload;
      delete state.tasks[taskId];
      state.columns[columnId].taskIds = state.columns[columnId].taskIds.filter(id => id !== taskId);
      saveToLocalStorage(state);
    },
    addColumn: (state, action) => {
      const columnId = `column-${Date.now()}`;
      state.columns[columnId] = { id: columnId, title: action.payload, taskIds: [] };
      state.columnOrder.push(columnId);
      saveToLocalStorage(state);
    },
    deleteColumn: (state, action) => {
      const columnId = action.payload;
      state.columnOrder = state.columnOrder.filter(id => id !== columnId);
      state.columns[columnId].taskIds.forEach(taskId => delete state.tasks[taskId]);
      delete state.columns[columnId];
      saveToLocalStorage(state);
    },
    moveTask: (state, action) => {
      const { source, destination, draggableId } = action.payload;
      if (!destination) return;
      const sourceColumn = state.columns[source.droppableId];
      const destColumn = state.columns[destination.droppableId];

      sourceColumn.taskIds.splice(source.index, 1);
      destColumn.taskIds.splice(destination.index, 0, draggableId);
      saveToLocalStorage(state);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      saveToLocalStorage(state);
    },
  },
});

export const { addTask, deleteTask, addColumn, deleteColumn, moveTask, toggleTheme } = boardSlice.actions;
export default boardSlice.reducer;