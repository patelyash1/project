import React, { useState } from 'react';
import { useTaskData } from './hooks/useTaskData'; 
import Sidebar from './components/Sidebar';       
import TaskList from './components/TaskList';     
import TaskForm from './components/TaskForm';     
import { Plus, Menu } from 'lucide-react';
import './App.css'; 
import axios from 'axios';

function App() {
// In App.js

const handleSubtaskToggle = (task, subtaskIndex) => {
    // 1. Create a copy of the subtasks (safety first!)
    const updatedSubtasks = [...task.subtasks];
    
    // 2. Toggle the completed status
    updatedSubtasks[subtaskIndex] = {
        ...updatedSubtasks[subtaskIndex],
        completed: !updatedSubtasks[subtaskIndex].completed
    };

    // 3. Create a completely new task object with the update
    const updatedTask = { 
        ...task, 
        subtasks: updatedSubtasks 
    };

    // 4. Send to your hook (which handles Axios & State update automatically)
    updateTask(updatedTask);
};
  
  
  const { 
    folders, activeFolder, setActiveFolder, addFolder, 
    getFilteredTasks, addTask, updateTask, toggleTask, deleteTask 
  } = useTaskData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      const updated = { ...editingTask, ...taskData };
      updateTask(updated); // Uses the updated hook logic
    } else {
      addTask(taskData);
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

   // In App.js



  return (
    <div className="app-layout">
      <div className={`sidebar-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
        <Sidebar 
          folders={folders} activeFolder={activeFolder}
          setActiveFolder={(name) => { setActiveFolder(name); setMobileMenuOpen(false); }}
          onAddFolder={addFolder}
          onSettingsClick={() => alert("Settings coming soon!")}
        />
      </div>
      <main className="main-workspace">
        <header className="workspace-header">
           <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}><Menu /></button>
           <h1>{activeFolder}</h1>
           <span className="date-badge">{new Date().toDateString()}</span>
        </header>
        <TaskList 
           tasks={getFilteredTasks()} 
           onToggle={toggleTask}
            onDelete={deleteTask}
           onEdit={handleEditTask} 
           onSubtaskToggle={handleSubtaskToggle} 
           accentColor="#ef4444"
        />
        <button className="fab" onClick={() => { setEditingTask(null); setIsModalOpen(true); }} title="Create New Task"><Plus size={24} /></button>
      </main>
      {isModalOpen && (
        <TaskForm 
           folders={folders} initialData={editingTask}
           onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
           onSave={handleSaveTask}
        />
      )}
      {mobileMenuOpen && <div className="overlay" onClick={() => setMobileMenuOpen(false)}></div>}
    </div>
  );
}
export default App;