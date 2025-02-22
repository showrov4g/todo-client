import React from "react";
import { useTask } from "../context/TaskContext";

const TaskForm = () => {
  const {user, taskData, setTaskData, handleTask, editingTask } = useTask();


  const handleSubmit = (e) => {
    e.preventDefault();
    handleTask();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        value={taskData.title}
        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        placeholder="Title"
        className="border p-2 rounded"
        required
      />
      <textarea
        value={taskData.description}
        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
        placeholder="Description"
        className="border p-2 rounded"
        required
      ></textarea>
      
      {/* ✅ Category Selection Dropdown */}
      <select
        value={taskData.category || "Select one"}
        onChange={(e) => setTaskData({ ...taskData, category: e.target.value })}
        className="border p-2 rounded"
        required
      >
        <option value="To-Do">To-Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
