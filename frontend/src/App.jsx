import React, { useEffect, useState } from 'react'
import './App.css'
import TasksList from './components/TasksList'
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/tasks";

function getAPIData() {
  return axios.get(API_URL).then((response) => response.data)
}

function App() {
  const [tasks, setTasks] = React.useState([]);

  useEffect(() => {
    let mounted = true;
    getAPIData().then((items) => {
      if (mounted) {
        setTasks(items);
      }
    })
    return() => (mounted = false);

  }, []);

  return (
    <>
      testeeeeee

      <TasksList tasks={tasks} />
    </>
  )
}
export default App;


