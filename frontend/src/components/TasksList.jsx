// TasksList.jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1/tasks";

function TasksList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newName, setNewName] = useState('');
  const [newStartingTime, setNewStartingTime] = useState('');
  const [newEndingTime, setNewEndingTime] = useState('');

  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setNewName(task.name);
    setNewStartingTime(task.starting_time)
    setNewEndingTime(task.ending_time)
  };

  const handleUpdate = (e, taskId) => {
    e.preventDefault();

    axios.put(`${API_URL}/${taskId}`, { task: { name: newName, starting_time: newStartingTime, ending_time: newEndingTime } })
      .then(response => {
        onTaskUpdated(response.data);
        setEditingTaskId(null);
      })
      .catch(error => {
        console.error("There was an error updating the task!", error);
      });
  };

  const handleDelete = (taskId) => {
    axios.delete(`${API_URL}/${taskId}`)
      .then(() => {
        onTaskDeleted(taskId);
      })
      .catch(error => {
        console.error("There was an error deleting the task!", error);
      });
  };

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          {editingTaskId === task.id ? (
            <form onSubmit={(e) => handleUpdate(e, task.id)}>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                required
              />
              <input
                type="text"
                value={newStartingTime}
                onChange={e => setNewStartingTime(e.target.value)}
                required
              />
              <input
                type="text"
                value={newEndingTime}
                onChange={e => setNewEndingTime(e.target.value)}
                required
              />
              <button type="submit">Update</button>
              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
            </form>
          ) : (
            <>
              <span>{task.name}</span>
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <span>{task.starting_time}</span>
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
              <span>{task.ending_time}</span>
              <button onClick={() => handleEditClick(task)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TasksList;
