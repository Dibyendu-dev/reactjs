import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import { addColumn, moveTask, toggleTheme } from "../features/boardSlice";
import { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";

export default function Board() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board);
  const [newColTitle, setNewColTitle] = useState("");

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;
    dispatch(moveTask({ source, destination, draggableId }));
  };

  return (
    <div
      className={`min-h-screen ${
        board.theme === "dark"
          ? "dark bg-gray-950 text-white"
          : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Kanban Todo App</h1>
        <button
          onClick={() => dispatch(toggleTheme())}
          className="px-3 py-1 bg-gray-700 text-white rounded"
        >
          Toggle Theme
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!newColTitle) return;
          dispatch(addColumn(newColTitle));
          setNewColTitle("");
        }}
        className="p-4"
      >
        <input
          value={newColTitle}
          onChange={(e) => setNewColTitle(e.target.value)}
          placeholder="New column title..."
          className="p-2 rounded mr-2 border-2 border-green-800 rounded-lg  "
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Add Column
        </button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap">
          {board.columnOrder.map((colId) => (
            <Column key={colId} column={board.columns[colId]} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
