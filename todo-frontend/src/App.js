// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TaskInput from './TaskInput';
// import TaskItem from './TaskItem';

// /**
//  * Main Application Component
//  * Manages task state, API interactions, and global theme (Dark/Light mode).
//  */
// function App() {
//   // --- State Management ---
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [darkMode, setDarkMode] = useState(true);

//   // --- API Interactions ---

//   // Initial data fetch on component mount
//   useEffect(() => {
//     axios.get('http://localhost:8080/tasks')
//       .then(response => setTasks(response.data))
//       .catch(error => console.error("Failed to fetch tasks:", error));
//   }, []);

//   const addTask = (title, dueDate) => {
//     // Backend expects null for empty dates, not empty strings
//     const newTask = { 
//       title, 
//       completed: false, 
//       dueDate: dueDate !== "" ? dueDate : null 
//     };

//     axios.post('http://localhost:8080/tasks', newTask)
//       .then(response => setTasks([...tasks, response.data]))
//       .catch(error => console.error(error));
//   };

//   const toggleComplete = (id) => {
//     const task = tasks.find(t => t.id === id);
//     // Optimistic update pattern could be applied here, 
//     // but currently waiting for server response to ensure sync.
//     const updated = { ...task, completed: !task.completed };

//     axios.put(`http://localhost:8080/tasks/${id}`, updated)
//       .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
//   };

//   const deleteTask = (id) => {
//     axios.delete(`http://localhost:8080/tasks/${id}`)
//       .then(() => setTasks(tasks.filter(t => t.id !== id)));
//   };

//   const editTask = (id, newTitle, newDate) => {
//     const task = tasks.find(t => t.id === id);
//     const updated = { ...task, title: newTitle, dueDate: newDate !== "" ? newDate : null };

//     axios.put(`http://localhost:8080/tasks/${id}`, updated)
//       .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
//   };

//   /**
//    * Batch deletes all completed tasks.
//    * Uses Promise.all to ensure all API calls finish before updating UI.
//    */
//   const clearCompleted = () => {
//     const completed = tasks.filter(t => t.completed);
//     if (completed.length === 0) return;

//     if (window.confirm(`Delete ${completed.length} completed tasks?`)) {
//       Promise.all(completed.map(t => axios.delete(`http://localhost:8080/tasks/${t.id}`)))
//         .then(() => setTasks(tasks.filter(t => !t.completed)))
//         .catch(error => console.error("Batch delete failed:", error));
//     }
//   };

//   // --- Helpers & Logic ---

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'completed') return task.completed;
//     if (filter === 'active') return !task.completed;
//     return true;
//   });

//   // --- Theme Configuration ---
//   const theme = {
//     bg: darkMode ? "#121212" : "#F0F2F5",
//     text: darkMode ? "white" : "black",
//     card: darkMode ? "#1E1E1E" : "white",
//     accent: "#BB86FC"
//   };

//   const btnStyle = (type) => ({
//     background: filter === type ? theme.accent : "transparent",
//     color: filter === type ? "black" : theme.accent,
//     border: `1px solid ${theme.accent}`,
//     padding: "5px 15px",
//     borderRadius: "20px",
//     cursor: "pointer",
//     marginRight: "10px",
//     fontWeight: "bold"
//   });

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.text, padding: "50px 20px", fontFamily: "Arial, sans-serif", transition: "all 0.3s" }}>
//       <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
//           <h1 style={{ margin: 0 }}>My To-Do App</h1>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
//             title="Toggle Light/Dark Mode"
//           >
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//         </div>

//         <TaskInput onAddTask={addTask} darkMode={darkMode} />

//         <div style={{ margin: "20px 0" }}>
//           <button onClick={() => setFilter('all')} style={btnStyle('all')}>All</button>
//           <button onClick={() => setFilter('active')} style={btnStyle('active')}>Active</button>
//           <button onClick={() => setFilter('completed')} style={btnStyle('completed')}>Completed</button>
//         </div>

//         <div style={{ background: theme.card, borderRadius: "10px", padding: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "all 0.3s" }}>
//           {filteredTasks.length === 0 ? <p style={{ color: "gray", padding: "20px" }}>No tasks here!</p> : null}

//           {filteredTasks.map((task) => (
//             <TaskItem
//               key={task.id}
//               task={task}
//               toggleComplete={toggleComplete}
//               deleteTask={deleteTask}
//               editTask={editTask}
//               darkMode={darkMode}
//             />
//           ))}
//         </div>

//         {tasks.some(t => t.completed) && (
//           <button
//             onClick={clearCompleted}
//             style={{
//               marginTop: "30px",
//               background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
//               color: "white",
//               border: "none",
//               padding: "12px 30px",
//               borderRadius: "30px",
//               cursor: "pointer",
//               fontSize: "1rem",
//               fontWeight: "bold",
//               boxShadow: "0 4px 15px rgba(255, 65, 108, 0.4)",
//               transition: "transform 0.2s, box-shadow 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = "translateY(-2px) scale(1.05)";
//               e.target.style.boxShadow = "0 6px 20px rgba(255, 65, 108, 0.6)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "translateY(0) scale(1)";
//               e.target.style.boxShadow = "0 4px 15px rgba(255, 65, 108, 0.4)";
//             }}
//           >
//             Clear Completed
//           </button>
//         )}

//       </div>
//     </div>
//   );
// }

// export default App;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import TaskInput from './TaskInput';
// import TaskItem from './TaskItem';

// /**
//  * Main Application Component
//  * Manages task state, API interactions, and global theme (Dark/Light mode).
//  */
// function App() {
//   // --- State Management ---
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [darkMode, setDarkMode] = useState(true);
//   const [isConfirmingClear, setIsConfirmingClear] = useState(false);

//   // 👇 API URL CONFIGURATION
//   // We store the URL in a variable so it's easy to change later if needed.
//   const API_URL = 'https://todo-web-app-9zwz.onrender.com/tasks';

//   // --- API Interactions ---

//   // Initial data fetch on component mount
//   useEffect(() => {
//     axios.get(API_URL)
//       .then(response => setTasks(response.data))
//       .catch(error => console.error("Failed to fetch tasks:", error));
//   }, []);

//   const addTask = (title, dueDate) => {
//     // Backend expects null for empty dates, not empty strings
//     const newTask = { 
//       title, 
//       completed: false, 
//       dueDate: dueDate !== "" ? dueDate : null 
//     };

//     axios.post(API_URL, newTask)
//       .then(response => setTasks([...tasks, response.data]))
//       .catch(error => console.error(error));
//   };

//   const toggleComplete = (id) => {
//     const task = tasks.find(t => t.id === id);
//     // Optimistic update pattern could be applied here, 
//     // but currently waiting for server response to ensure sync.
//     const updated = { ...task, completed: !task.completed };

//     axios.put(`${API_URL}/${id}`, updated)
//       .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
//   };

//   const deleteTask = (id) => {
//     axios.delete(`${API_URL}/${id}`)
//       .then(() => setTasks(tasks.filter(t => t.id !== id)));
//   };

//   const editTask = (id, newTitle, newDate) => {
//     const task = tasks.find(t => t.id === id);
//     const updated = { ...task, title: newTitle, dueDate: newDate !== "" ? newDate : null };

//     axios.put(`${API_URL}/${id}`, updated)
//       .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
//   };

//   /**
//    * Batch deletes all completed tasks.
//    * Uses Promise.all to ensure all API calls finish before updating UI.
//    */
//   // const clearCompleted = () => {
//   //   const completed = tasks.filter(t => t.completed);
//   //   if (completed.length === 0) return;

//   //   if (window.confirm(`Delete ${completed.length} completed tasks?`)) {
//   //     Promise.all(completed.map(t => axios.delete(`${API_URL}/${t.id}`)))
//   //       .then(() => setTasks(tasks.filter(t => !t.completed)))
//   //       .catch(error => console.error("Batch delete failed:", error));
//   //   }
//   // }; // prev using alert box of java to confirm to delete all completed tasks 
 


// const clearCompleted = () => {
  
//   if (!isConfirmingClear) {
//     setIsConfirmingClear(true);
    
//     setTimeout(() => setIsConfirmingClear(false), 3000);
//     return;
//   }

  
//   const completed = tasks.filter(t => t.completed);
//   if (completed.length === 0) return;

//   Promise.all(completed.map(t => axios.delete(`${API_URL}/${t.id}`)))
//     .then(() => {
//       setTasks(tasks.filter(t => !t.completed));
//       setIsConfirmingClear(false); 
//     })
//     .catch(error => console.error("Batch delete failed:", error));
// };



// {tasks.some(t => t.completed) && (
//   <button
//     onClick={clearCompleted}
//     style={{
//       // ... keep your existing styles ...
//       // Change color to Orange if confirming
//       background: isConfirmingClear 
//         ? "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)"
//         : "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)", 
//     }}
//   >
//     {isConfirmingClear ? "Click Again to Confirm" : "Clear Completed"}
//   </button>
// )}


//   // --- Helpers & Logic ---

//   const filteredTasks = tasks.filter(task => {
//     if (filter === 'completed') return task.completed;
//     if (filter === 'active') return !task.completed;
//     return true;
//   });

//   // --- Theme Configuration ---
//   const theme = {
//     bg: darkMode ? "#121212" : "#F0F2F5",
//     text: darkMode ? "white" : "black",
//     card: darkMode ? "#1E1E1E" : "white",
//     accent: "#BB86FC"
//   };

//   const btnStyle = (type) => ({
//     background: filter === type ? theme.accent : "transparent",
//     color: filter === type ? "black" : theme.accent,
//     border: `1px solid ${theme.accent}`,
//     padding: "5px 15px",
//     borderRadius: "20px",
//     cursor: "pointer",
//     marginRight: "10px",
//     fontWeight: "bold"
//   });

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.text, padding: "50px 20px", fontFamily: "Arial, sans-serif", transition: "all 0.3s" }}>
//       <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>

//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
//           <h1 style={{ margin: 0 }}>My To-Do App</h1>
//           <button
//             onClick={() => setDarkMode(!darkMode)}
//             style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
//             title="Toggle Light/Dark Mode"
//           >
//             {darkMode ? "☀️" : "🌙"}
//           </button>
//         </div>

//         <TaskInput onAddTask={addTask} darkMode={darkMode} />

//         <div style={{ margin: "20px 0" }}>
//           <button onClick={() => setFilter('all')} style={btnStyle('all')}>All</button>
//           <button onClick={() => setFilter('active')} style={btnStyle('active')}>Active</button>
//           <button onClick={() => setFilter('completed')} style={btnStyle('completed')}>Completed</button>
//         </div>

//         <div style={{ background: theme.card, borderRadius: "10px", padding: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "all 0.3s" }}>
//           {filteredTasks.length === 0 ? <p style={{ color: "gray", padding: "20px" }}>No tasks here!</p> : null}

//           {filteredTasks.map((task) => (
//             <TaskItem
//               key={task.id}
//               task={task}
//               toggleComplete={toggleComplete}
//               deleteTask={deleteTask}
//               editTask={editTask}
//               darkMode={darkMode}
//             />
//           ))}
//         </div>

//         {tasks.some(t => t.completed) && (
//           <button
//             onClick={clearCompleted}
//             style={{
//               marginTop: "30px",
//               background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
//               color: "white",
//               border: "none",
//               padding: "12px 30px",
//               borderRadius: "30px",
//               cursor: "pointer",
//               fontSize: "1rem",
//               fontWeight: "bold",
//               boxShadow: "0 4px 15px rgba(255, 65, 108, 0.4)",
//               transition: "transform 0.2s, box-shadow 0.2s",
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.transform = "translateY(-2px) scale(1.05)";
//               e.target.style.boxShadow = "0 6px 20px rgba(255, 65, 108, 0.6)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.transform = "translateY(0) scale(1)";
//               e.target.style.boxShadow = "0 4px 15px rgba(255, 65, 108, 0.4)";
//             }}
//           >
//             Clear Completed
//           </button>
//         )}

//       </div>
//     </div>
//   );
// }

// export default App;
// // Vercel Deployment Test 1,finale


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';

// 👇 1. DEFINE YOUR BACKGROUNDS (You can find more on Unsplash)
const backgroundThemes = [
  { id: 1, name: "Default", url: "" }, // Empty string = use standard color
  { id: 2, name: "Galaxy", url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop" },
  { id: 3, name: "Nature", url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop" },
  { id: 4, name: "City", url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" }
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  
  // 👇 2. NEW STATE FOR BACKGROUND
  // We try to load from localStorage so it remembers your choice!
  const [currentBg, setCurrentBg] = useState(localStorage.getItem('themeBg') || "");
  
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  
  // YOUR LIVE API URL
  const API_URL = 'https://todo-web-app-9zwz.onrender.com/tasks';

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Failed to fetch tasks:", error));
  }, []);

  // 👇 3. FUNCTION TO CHANGE BACKGROUND
  const changeBackground = (url) => {
    setCurrentBg(url);
    localStorage.setItem('themeBg', url); // Save to browser memory
  };

  // ... (Keep addTask, toggleComplete, deleteTask, editTask, clearCompleted exactly as they were) ...
  // (I am hiding them to save space, but DO NOT DELETE THEM from your file)
  const addTask = (title, dueDate) => {
    const newTask = { title, completed: false, dueDate: dueDate !== "" ? dueDate : null };
    axios.post(API_URL, newTask).then(response => setTasks([...tasks, response.data])).catch(error => console.error(error));
  };
  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    const updated = { ...task, completed: !task.completed };
    axios.put(`${API_URL}/${id}`, updated).then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };
  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => setTasks(tasks.filter(t => t.id !== id)));
  };
  const editTask = (id, newTitle, newDate) => {
    const task = tasks.find(t => t.id === id);
    const updated = { ...task, title: newTitle, dueDate: newDate !== "" ? newDate : null };
    axios.put(`${API_URL}/${id}`, updated).then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };
  const clearCompleted = () => {
    if (!isConfirmingClear) { setIsConfirmingClear(true); setTimeout(() => setIsConfirmingClear(false), 3000); return; }
    const completed = tasks.filter(t => t.completed);
    if (completed.length === 0) return;
    Promise.all(completed.map(t => axios.delete(`${API_URL}/${t.id}`)))
      .then(() => { setTasks(tasks.filter(t => !t.completed)); setIsConfirmingClear(false); })
      .catch(error => console.error("Batch delete failed:", error));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const theme = {
    bg: darkMode ? "#121212" : "#F0F2F5",
    text: darkMode ? "white" : "black",
    card: darkMode ? "#1E1E1E" : "white",
    accent: "#BB86FC"
  };

  const btnStyle = (type) => ({
    background: filter === type ? theme.accent : "transparent",
    color: filter === type ? "black" : theme.accent,
    border: `1px solid ${theme.accent}`,
    padding: "5px 15px",
    borderRadius: "20px",
    cursor: "pointer",
    marginRight: "10px",
    fontWeight: "bold"
  });

  return (
    <div style={{ 
      minHeight: "100vh", 
      // 👇 4. DYNAMIC BACKGROUND STYLE
      // If an image is selected, use it. If not, use the Dark Mode color.
      backgroundImage: currentBg ? `url(${currentBg})` : 'none',
      backgroundColor: theme.bg, 
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed", // Keeps image still while scrolling
      color: theme.text, 
      padding: "50px 20px", 
      fontFamily: "Arial, sans-serif", 
      transition: "background 0.5s ease" 
    }}>
      
      {/* Optional: Add a dark overlay so text is always readable on bright images */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: currentBg ? "rgba(0,0,0,0.5)" : "transparent", zIndex: 0, pointerEvents: "none" }}></div>

      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ margin: 0, textShadow: currentBg ? "2px 2px 4px rgba(0,0,0,0.8)" : "none" }}>My To-Do App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
            title="Toggle Light/Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* 👇 5. THEME SWITCHER BUTTONS */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
           {backgroundThemes.map(bg => (
             <button
               key={bg.id}
               onClick={() => changeBackground(bg.url)}
               title={`Set theme to ${bg.name}`}
               style={{
                 width: "30px",
                 height: "30px",
                 borderRadius: "50%",
                 border: currentBg === bg.url ? `2px solid ${theme.accent}` : "2px solid white",
                 background: bg.url ? `url(${bg.url}) center/cover` : theme.bg, // Show preview
                 cursor: "pointer",
                 transition: "transform 0.2s"
               }}
               onMouseEnter={(e) => e.target.style.transform = "scale(1.2)"}
               onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
             />
           ))}
        </div>

        <TaskInput onAddTask={addTask} darkMode={darkMode} />

        <div style={{ margin: "20px 0" }}>
          <button onClick={() => setFilter('all')} style={btnStyle('all')}>All</button>
          <button onClick={() => setFilter('active')} style={btnStyle('active')}>Active</button>
          <button onClick={() => setFilter('completed')} style={btnStyle('completed')}>Completed</button>
        </div>

        {/* Added backdrop-filter for a cool "Glassmorphism" effect */}
        <div style={{ 
          background: darkMode ? "rgba(30, 30, 30, 0.85)" : "rgba(255, 255, 255, 0.85)", 
          backdropFilter: "blur(10px)",
          borderRadius: "10px", 
          padding: "10px", 
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)", 
          transition: "all 0.3s" 
        }}>
          {filteredTasks.length === 0 ? <p style={{ color: "gray", padding: "20px" }}>No tasks here!</p> : null}

          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              editTask={editTask}
              darkMode={darkMode}
            />
          ))}
        </div>

        {tasks.some(t => t.completed) && (
          <button
            onClick={clearCompleted}
            style={{
              marginTop: "30px",
              background: isConfirmingClear 
                ? "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)"
                : "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "30px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold",
              boxShadow: "0 4px 15px rgba(255, 65, 108, 0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {isConfirmingClear ? "Click Again to Confirm" : "Clear Completed"}
          </button>
        )}

      </div>
    </div>
  );
}

export default App;