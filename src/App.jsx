import React, { useRef } from "react";
import AddTask from './components/AddTask'
import ImportTasks from './components/ImportTasks'
import TaskTable from './components/TaskTable'
import './App.css';

const App = () => {

  const tableRef = useRef();

  return (
   <div className="container">
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <AddTask fetchTasks={() => tableRef.current.fetchTasks()} />

      {/* Import Tasks */}
      <ImportTasks fetchTasks={() => tableRef.current.fetchTasks()} />

      {/* Tasks Table (Card-style) */}
      <TaskTable ref={tableRef} />
    </div>
  )
}

export default App