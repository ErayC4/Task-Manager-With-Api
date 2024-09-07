// TaskForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/tasks";

function TaskForm({ onTaskCreated }) {
  const [name, setName] = useState('');
  const [startingTime, setStartingTime] = useState('');
  const [endingTime, setEndingTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API_URL, { task: { name, starting_time: startingTime, ending_time: endingTime } })
      .then(response => {
        onTaskCreated(response.data);
        setName(''); // Clear the form
        setStartingTime('');
        setEndingTime('')
      })
      .catch(error => {
        console.error("There was an error creating the task!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Starting Time"
        value={startingTime}
        onChange={e => setStartingTime(e.target.value)} 
      />
      <input
        type="text"
        placeholder="Ending Time"
        value={endingTime}
        onChange={e => setEndingTime(e.target.value)} 
      />
      <button type="submit">Create Task</button>
    </form>
  );
}

export default TaskForm;
