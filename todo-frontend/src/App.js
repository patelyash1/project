import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Settings from './Settings';         // 👈 Check if this file exists!
import TaskItem from './TaskItem';
import TaskFormModal from './TaskFormModal'; // 👈 Check if this file exists!
import { Plus, Menu } from 'lucide-react';
import './App.css';

// Background Themes List
const backgroundThemes = [
  { id: 1, name: "Default", url: "" },
  { id: 2, name: "Galaxy", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, name: "Nature", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, name: "City", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" }
];

function App() {
  // --- STATE ---
  const [tasks, setTasks] = useState([]);
  const [folders, setFolders] = useState([
    { id: 1, name: "Inbox" },
    { id: 2, name: "Work" },
    { id: 3, name: "Personal" }
  ]);
  
  const [activeFolder, setActiveFolder] = useState("Inbox");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [view, setView] = useState('dashboard'); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Theme State
  const [darkMode, setDarkMode] = useState(true);
  const [currentBg, setCurrentBg] = useState(localStorage.getItem('themeBg') || "");
  const [accentColor, setAccentColor] = useState('#6200EE');

  // API URL (Your Live Backend)
  const API_URL = 'https://todo-web-app-9zwz.onrender.com/tasks';

  // --- EFFECT: Fetch Data ---
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Failed to fetch tasks:", error));
  }, []);

  // --- HANDLERS ---
  const handleAddFolder = () => {
    const name = prompt("Folder Name:");
    if (name) setFolders([...folders, { id: Date.now(), name }]);
  };

  const changeBackground = (url) => {
    setCurrentBg(url);
    localStorage.setItem('themeBg', url);
  };

  // --- FILTERING ---
  const filteredTasks = tasks.filter(task => {
    if (activeFolder === 'today') {
       if (!task.dueDate) return false;
       return new Date(task.dueDate).toDateString() === new Date().toDateString();
    }
    if (activeFolder === 'upcoming') {
       if (!task.dueDate) return false;
       return new Date(task.dueDate) > new Date();
    }
    if (activeFolder === 'expired') {
       if (!task.dueDate) return false;
       return new Date(task.dueDate) < new Date() && !task.completed;
    }
    const taskFolder = task.folder || 'Inbox';
    return taskFolder === activeFolder;
  });

  // --- TASK ACTIONS ---
  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    const updated = { ...task, completed: !task.completed };
    axios.put(`${API_URL}/${id}`, updated)
      .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  return (
    <div 
      className="dashboard-layout"
      style={{
        backgroundImage: currentBg ? `url(${currentBg})` : 'none',
        backgroundColor: darkMode ? '#121212' : '#f4f5f7',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: darkMode ? 'white' : '#333'
      }}
    >
      {currentBg && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 0 }}></div>
      )}

      {/* SIDEBAR */}
      <div className={`sidebar-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
         <Sidebar 
            folders={folders} 
            activeFolder={activeFolder} 
            setActiveFolder={(id) => { setActiveFolder(id); setView('dashboard'); setMobileMenuOpen(false); }}
            onAddFolder={handleAddFolder}
            onSettingsClick={() => { setView('settings'); setMobileMenuOpen(false); }}
            darkMode={darkMode}
         />
      </div>

      {/* MAIN CONTENT */}
      <main className="main-content" style={{ zIndex: 1 }}>
        <header className="top-bar" style={{ 
            background: darkMode ? "rgba(30,30,30,0.8)" : "rgba(255,255,255,0.8)",
            color: darkMode ? "white" : "black"
        }}>
          <button className="menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu color={darkMode ? "white" : "black"} />
          </button>
          <h1>
             {view === 'settings' ? 'Settings' : (folders.find(f => f.id === activeFolder)?.name || activeFolder)}
          </h1>
          <div className="date-display">{new Date().toDateString()}</div>
        </header>

        {view === 'dashboard' ? (
          <>
            <div className="task-container">
               {filteredTasks.length === 0 ? (
                 <div className="empty-state">
                    <h3 style={{ color: darkMode ? '#aaa' : '#555' }}>No tasks in {activeFolder}</h3>
                    <p style={{ color: darkMode ? '#666' : '#888' }}>Click the + button to add a new task.</p>
                 </div>
               ) : (
                 <div className="glass-panel" style={{ background: 'transparent', boxShadow: 'none' }}>
                    {filteredTasks.map(task => (
                       <TaskItem 
                         key={task.id} 
                         task={task} 
                         toggleComplete={toggleComplete}
                         deleteTask={deleteTask}
                         darkMode={darkMode}
                         accentColor={accentColor}
                         editTask={() => {}} // Placeholder to prevent crash
                       /> 
                    ))}
                 </div>
               )}
            </div>

            <button 
              className="fab" 
              style={{ background: accentColor }}
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={28} />
            </button>

            <TaskFormModal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              folders={folders}
              darkMode={darkMode}
              onSave={(newTaskData) => {
                const newTask = { id: Date.now(), ...newTaskData, completed: false };
                setTasks([...tasks, newTask]);
              }}
            />
          </>
        ) : (
          <Settings 
             darkMode={darkMode} setDarkMode={setDarkMode}
             currentBg={currentBg} changeBackground={changeBackground}
             backgroundThemes={backgroundThemes}
             accentColor={accentColor} setAccentColor={setAccentColor}
          />
        )}
      </main>

      {mobileMenuOpen && (
        <div className="overlay" onClick={() => setMobileMenuOpen(false)}></div>
      )}
    </div>
  );
}

export default App;