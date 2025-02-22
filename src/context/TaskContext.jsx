import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/Firebase.init";
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // provider
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
 
  console.log(user);
  const [loading, setLoading] = useState(false);
  const socket = io("https://task-management-serverl.onrender.com");
  const [tasks, setTasks] = useState([]);
  
 
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    category:"To-Do",
    email: email,
    
  });

  console.log(taskData);
  const [editingTask, setEditingTask] = useState(null);


  useEffect(()=>{
    setEmail(user?.email)
  },[user])
  //  user details related
  const createUser = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };


 

  const fetchTasks = async () => {
    const response = await axios.get(`https://task-management-serverl.onrender.com/tasks?email=${user?.email}`);
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
    socket.on("taskUpdated", fetchTasks);
    return () => socket.off("taskUpdated");
  }, [fetchTasks]);

  const moveTask = async (taskId, newCategory) => {
    await axios.put(`https://task-management-serverl.onrender.com/tasks/${taskId}`, {
      category: newCategory,
    });
  };

  const handleTask = async () => {
    if (!taskData.title.trim()) return;
    if (editingTask) {
      await axios.put(
        `https://task-management-serverl.onrender.com/tasks/${editingTask._id}`,
        taskData
      );
      setEditingTask(null);
    } else {
      await axios.post("https://task-management-serverl.onrender.com/tasks", taskData);
    }
    setTaskData({ title: "", description: "",category:'', email: user?.email});
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
    await axios.delete(`https://task-management-serverl.onrender.com/tasks/${taskId}`);
  };


  // user observer
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
  };

  return <TaskContext.Provider value={info}>{children}</TaskContext.Provider>;
};

export const useTask = () => useContext(TaskContext);
