import { useState, useEffect } from 'react';
import axios from 'axios';

// ⚠️ CHANGE THIS TO http://localhost:8080/tasks FOR LOCAL TESTING
// CHANGE TO YOUR RENDER URL FOR ONLINE
const API_URL = 'http://localhost:8080/tasks'; 

export const useTaskData = () => {
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([
    { id: 'inbox', name: 'Inbox' },
    { id: 'work', name: 'Work' }, 
    { id: 'personal', name: 'Personal' }
  ]);
  const [activeFolder, setActiveFolder] = useState('Inbox');

  // FETCH
  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.error("Load Error:", err));
  }, []);

  // FILTER
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      if (activeFolder === 'Today') {
         if (!task.dueDate) return false;
         return new Date(task.dueDate).toDateString() === new Date().toDateString();
      }
      if (activeFolder === 'Upcoming') return task.dueDate && new Date(task.dueDate) > new Date();
      if (activeFolder === 'Missed') return task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
      
      const taskFolder = task.folder || 'Inbox';
      return taskFolder === activeFolder;
    });
  };

  // ACTIONS
  const addTask = async (taskData) => {
    try {
      const payload = {
        title: taskData.title,
        description: taskData.description,
        folder: taskData.folder || 'Inbox',
        subtasks: taskData.subtasks || [],
        dueDate: taskData.dueDate,
        completed: false
      };
      const res = await axios.post(API_URL, payload);
      setTasks(prev => [...prev, res.data]);
    } catch (err) {
      console.error("Save Error:", err);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
      await axios.put(`${API_URL}/${updatedTask.id}`, updatedTask);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    updateTask(updated);
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    axios.delete(`${API_URL}/${id}`);
  };

  return {
    folders, activeFolder, setActiveFolder,
    addFolder: (name) => setFolders([...folders, { id: Date.now(), name }]),
    getFilteredTasks, addTask, updateTask, toggleTask, deleteTask
  };
};