// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import TasksList from './components/TasksList';
import TaskForm from './components/TaskForm';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  
  const handleTaskUpdated = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
  };
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const handleTaskDeleted = (deletedTaskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTaskId));
  };
  
  return (
    <>
      <h1>Task Manager</h1>
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TasksList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted}
      />
    </>
  );
}

export default App;
