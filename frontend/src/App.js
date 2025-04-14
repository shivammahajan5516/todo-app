import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState('');
  const [editing, setEditing] = useState(null);
  const [notifiedTaskIds, setNotifiedTaskIds] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tasks').then((res) => setTasks(res.data));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      tasks.forEach((task) => {
        const taskReminder = new Date(task.reminder);
        if (
          task.reminder &&
          !isNaN(taskReminder) &&
          taskReminder <= now &&
          !notifiedTaskIds.includes(task._id)
        ) {
          alert(`🔔 Reminder: ${task.title}`);
          setNotifiedTaskIds((prev) => [...prev, task._id]);
        }
      });
    }, 60000); // check every minute

    return () => clearInterval(interval);
  }, [tasks, notifiedTaskIds]);

  const addOrUpdateTask = () => {
    const taskData = {
      title,
      category,
      completed,
      dueDate: new Date(dueDate),
      reminder: reminder ? new Date(reminder) : null,
    };

    if (editing) {
      axios
        .put(`http://localhost:5000/tasks/${editing._id}`, taskData)
        .then((res) => {
          setTasks(tasks.map((task) => (task._id === editing._id ? res.data : task)));
          resetForm();
        });
    } else {
      axios.post('http://localhost:5000/tasks', taskData).then((res) => {
        setTasks([...tasks, res.data]);
        resetForm();
      });
    }
  };

  const editTask = (task) => {
    setTitle(task.title);
    setCategory(task.category);
    setCompleted(task.completed);
    setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : '');
    setReminder(task.reminder ? new Date(task.reminder).toISOString().slice(0, 16) : '');
    setEditing(task);
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  const resetForm = () => {
    setTitle('');
    setCategory('');
    setCompleted(false);
    setDueDate('');
    setReminder('');
    setEditing(null);
  };

  return (
    <div className='container mt-5'>
      <h1 className='mb-4 text-center'>To-Do List</h1>
      <div className='card p-4 shadow-lg' style={{ backgroundColor: '#f8f9fa' }}>
        <div className='mb-3'>
          <input
            className='form-control'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task Title'
          />
        </div>
        <div className='mb-3'>
          <input
            className='form-control'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder='Category'
          />
        </div>
        <div className='mb-3'>
          <input
            className='form-control'
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <input
            className='form-control'
            type='datetime-local'
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='form-check-label'>Completed</label>
          <input
            className='form-check-input ml-2'
            type='checkbox'
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <div className='d-flex justify-content-between'>
          <button onClick={addOrUpdateTask} className='btn btn-primary'>
            {editing ? 'Update Task' : 'Add Task'}
          </button>
          <button onClick={resetForm} className='btn btn-secondary'>
            Reset
          </button>
        </div>
      </div>

      <ul className='list-group mt-4'>
        {tasks.map((task) => (
          <li
            key={task._id}
            className='list-group-item d-flex justify-content-between align-items-center'
          >
            <div>
              <strong>{task.title}</strong>
              <br />
              <small>Category: {task.category}</small>
              <br />
              <small>Due Date: {new Date(task.dueDate).toLocaleDateString()}</small>
              <br />
              <small>Status: {task.completed ? 'Completed' : 'Not Completed'}</small>
              <br />
              {task.reminder && !isNaN(new Date(task.reminder)) && (
                <small>Reminder: {new Date(task.reminder).toLocaleString()}</small>
              )}
            </div>
            <div className='d-flex gap-2'>
              <button className='btn btn-primary' onClick={() => editTask(task)}>
                Edit
              </button>
              <button className='btn btn-secondary' onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
