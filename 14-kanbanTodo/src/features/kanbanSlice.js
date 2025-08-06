import { createSlice } from '@reduxjs/toolkit'

const saved = localStorage.getItem('kanbanState')
const initialState = saved
  ? JSON.parse(saved)
  : {
      columns: {
        'todo': { id: 'todo', title: 'To Do', taskIds: [] },
        'inprogress': { id: 'inprogress', title: 'In Progress', taskIds: [] },
        'done': { id: 'done', title: 'Done', taskIds: [] },
      },
      tasks: {},
      columnOrder: ['todo', 'inprogress', 'done'],
    }

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const id = Date.now().toString()
      const task = { id, content: action.payload }
      state.tasks[id] = task
      state.columns['todo'].taskIds.push(id)
    },
    editTask: (state, action) => {
      const { id, content } = action.payload
      state.tasks[id].content = content
    },
    deleteTask: (state, action) => {
      const taskId = action.payload
      delete state.tasks[taskId]
      for (const col of Object.values(state.columns)) {
        col.taskIds = col.taskIds.filter(id => id !== taskId)
      }
    },
    moveTask: (state, action) => {
      const { source, destination } = action.payload
      const start = state.columns[source.droppableId]
      const finish = state.columns[destination.droppableId]

      if (start === finish) {
        const newTaskIds = [...start.taskIds]
        const [removed] = newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, removed)
        state.columns[start.id].taskIds = newTaskIds
      } else {
        const startTaskIds = [...start.taskIds]
        const [removed] = startTaskIds.splice(source.index, 1)
        const finishTaskIds = [...finish.taskIds]
        finishTaskIds.splice(destination.index, 0, removed)

        state.columns[start.id].taskIds = startTaskIds
        state.columns[finish.id].taskIds = finishTaskIds
      }
    },
    addColumn: (state, action) => {
      const id = Date.now().toString()
      state.columns[id] = { id, title: action.payload, taskIds: [] }
      state.columnOrder.push(id)
    },
  },
})

kanbanSlice.subscribe = () => {
  kanbanSlice.subscribe(() => {
    localStorage.setItem('kanbanState', JSON.stringify(kanbanSlice.getState()))
  })
}

export const { addTask, editTask, deleteTask, moveTask, addColumn } = kanbanSlice.actions
export default kanbanSlice.reducer
