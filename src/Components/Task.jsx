import React from "react";
import { useDrag } from "react-dnd";

const Task = ({ task, editTask, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id, category: task.category },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  return (
    <div
      ref={drag}
      className={`p-4 bg-white shadow rounded flex flex-col cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <h4 className="font-bold">{task.title}</h4>
      <p>{task.description}</p>
      <p className="text-xs text-gray-500">Category: {task.category}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => editTask(task)}
          className="bg-yellow-500 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
