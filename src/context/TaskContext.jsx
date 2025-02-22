import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase/Firebase.init";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'



const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = io("https://task-management-serverl.onrender.com");
  const [editingTask, setEditingTask] = useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category: "To-Do",
    email: "",
    Timestamp: "",
  });

  useEffect(() => {
    if (user) {
      setTaskData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const createUser = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
      toast.success("Login Successful!");
    } catch (error) {
      toast.error("Login Failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  // user logout 
  const logout =async()=>{
    try {
      const res = await signOut(auth)
      setUser(res?.data)
      
      toast.success("Logout Successfully")
      
    } catch (error) {
      toast.error("error")
    }finally{
      
      fetchTasks()
      setLoading(false)
    }
  }


  const fetchTasks = async () => {
    if (!user?.email) return;
    try {
      const response = await axios.get(`https://task-management-serverl.onrender.com/tasks?email=${user.email}`);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks!");
    }
  };

  useEffect(() => {
    fetchTasks();
    socket.on("taskUpdated", fetchTasks);
    return () => socket.off("taskUpdated");
  }, [socket]);

  const moveTask = async (taskId, newCategory) => {
    if (!user?.email) return;
    try {
      await axios.put(`https://task-management-serverl.onrender.com/tasks/${taskId}`, {
        category: newCategory,
      });
      toast.success("Task moved successfully!");
    } catch (error) {
      toast.error("Failed to move task.");
    }
  };

  const handleTask = async () => {
    if (!user?.email) return;
    if (!taskData.title.trim()) {
      toast.error("Task title is required!");
      return;
    }

    try {
      if (editingTask) {
        await axios.put(`https://task-management-serverl.onrender.com/tasks/${editingTask._id}`, taskData);
        setEditingTask(null);
        toast.success("Task updated successfully!");
      } else {
        await axios.post("https://task-management-serverl.onrender.com/tasks", taskData);
        toast.success("Task added successfully!");
      }
      setTaskData({ title: "", description: "", category: "To-Do", email: user.email, Timestamp:"", });
    } catch (error) {
      toast.error("Failed to add/update task.");
    }
  };

  const editTask = (task) => {
    setTaskData({
      title: task.title,
      description: task.description,
      email: task.email,
    });
    setEditingTask(task);
  };

  const deleteTask = async (taskId) => {
    if (!user?.email) return;
    try {
      

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(async(result) => {
        if (result.isConfirmed) {
          await axios.delete(`https://task-management-serverl.onrender.com/tasks/${taskId}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
         
       
      
      });
    } catch (error) {
      toast.error("Failed to delete task.");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const info = {
    loading,
    user,
    tasks,
    taskData,
    setTaskData,
    editingTask,
    setEditingTask,
    fetchTasks,
    moveTask,
    handleTask,
    editTask,
    deleteTask,
    createUser,
    logout
  };

  return <TaskContext.Provider value={info}>{children}</TaskContext.Provider>;
};

export const useTask = () => useContext(TaskContext);
