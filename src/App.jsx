import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./Components/TaskForm";
import CategoryColumn from "./Components/CategoryColumn";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const App = () => {
  return (
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <Navbar />
        <div className="flex flex-col items-center m-5 md:m-10 min-h-svh ">
          <TaskForm />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <CategoryColumn title="To Do" category="To-Do" />
            <CategoryColumn title="In Progress" category="In Progress" />
            <CategoryColumn title="Done" category="Done" />
          </div>
        </div>
        <Footer></Footer>
      </DndProvider>
    </TaskProvider>
  );
};

export default App;
