import { Droppable } from "@hello-pangea/dnd";
import Task from "./Task";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteColumn } from "../features/boardSlice";
import { useState } from "react";

export default function Column({ column }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) =>
    column.taskIds.map((id) => state.board.tasks[id])
  );
  const [newTask, setNewTask] = useState("");

  return (
    <div className="w-64 bg-gray-200 dark:bg-gray-900 rounded p-4 m-2">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold text-black dark:text-white">
          {column.title}
        </h2>
        <button onClick={() => dispatch(deleteColumn(column.id))}>🗑️</button>
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[50px]"
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newTask) return;
          dispatch(addTask({ columnId: column.id, content: newTask }));
          setNewTask("");
        }}
        className="mt-2 "
      >
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
          className="w-full p-2 rounded border-1 border-black-700 rounded-lg text-white"
        />
      </form>
    </div>
  );
}
