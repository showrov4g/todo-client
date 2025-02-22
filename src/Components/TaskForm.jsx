import React, { useEffect } from "react";
import { useTask } from "../context/TaskContext";
import { toast } from "react-toastify";

const TaskForm = () => {
  const { user, taskData, setTaskData, handleTask, editingTask,loading } = useTask();

  useEffect(() => {
    if (!editingTask) {
      setTaskData((prev) => ({
        ...prev,
        timestamp: prev.timestamp || new Date().toISOString(),
      }));
    }
  }, [editingTask, setTaskData]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?.email) {
      return toast.error("please login first");
    }
    if (taskData.title.length > 50) {
      return toast.error("Title must be 50 characters or less.");
    }

    if (taskData.description.length > 200) {
      return toast.error("Description must be 200 characters or less.");
    }

    handleTask();
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-semibold capitalize">Add your Task</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 bg-white p-4 "
      >
        <input
          type="text"
          value={taskData.title}
          onChange={(e) =>
            setTaskData({ ...taskData, title: e.target.value.slice(0, 50) })
          }
          placeholder="Title (Max 50 characters)"
          className="border py-1 px-3.5 rounded"
          maxLength={50}
          required
        />

        <textarea
          value={taskData.description}
          onChange={(e) =>
            setTaskData({
              ...taskData,
              description: e.target.value.slice(0, 200),
            })
          }
          placeholder="Description (Max 200 characters)"
          className="border py-1 px-3.5 rounded"
          maxLength={200}
          required
        ></textarea>

        <select
          value={taskData.category || "To-Do"}
          onChange={(e) =>
            setTaskData({ ...taskData, category: e.target.value })
          }
          className="border py-1 px-3.5 rounded"
          required
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <input
          type="text"
          value={taskData.timestamp}
          className="border py-1 px-3.5 rounded bg-gray-100"
          readOnly
        />

        <button type="submit" className="btn btn-primary text-white py-7  rounded">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
