import React from "react";
import { useDrop } from "react-dnd";
import { useTask } from "../context/TaskContext";
import Task from "./Task";

const CategoryColumn = ({ title, category }) => {
  const { tasks, moveTask, editTask, deleteTask } = useTask();

  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => moveTask(item.id, category),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  return (
    <div ref={drop} className={`p-4  bg-gray-100 rounded shadow ${isOver ? "bg-blue-200" : ""}`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {tasks.filter((task) => task.category === category).map((task) => (
        <Task key={task._id} task={task} editTask={editTask} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default CategoryColumn;
