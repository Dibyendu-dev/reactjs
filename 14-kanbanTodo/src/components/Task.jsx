import { Draggable } from '@hello-pangea/dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/boardSlice';

export default function Task({ task, index, columnId }) {
  const dispatch = useDispatch();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="p-3 bg-white dark:bg-gray-800 shadow rounded mb-2 flex justify-between items-center"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <span>{task.content}</span>
          <button onClick={() => dispatch(deleteTask({ taskId: task.id, columnId }))}>❌</button>
        </div>
      )}
    </Draggable>
  );
}