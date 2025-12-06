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




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskInput from './TaskInput';
import TaskItem from './TaskItem';

/**
 * Main Application Component
 * Manages task state, API interactions, and global theme (Dark/Light mode).
 */
function App() {
  // --- State Management ---
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(true);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  // 👇 API URL CONFIGURATION
  // We store the URL in a variable so it's easy to change later if needed.
  const API_URL = 'https://todo-web-app-9zwz.onrender.com/tasks';

  // --- API Interactions ---

  // Initial data fetch on component mount
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Failed to fetch tasks:", error));
  }, []);

  const addTask = (title, dueDate) => {
    // Backend expects null for empty dates, not empty strings
    const newTask = { 
      title, 
      completed: false, 
      dueDate: dueDate !== "" ? dueDate : null 
    };

    axios.post(API_URL, newTask)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
  };

  const toggleComplete = (id) => {
    const task = tasks.find(t => t.id === id);
    // Optimistic update pattern could be applied here, 
    // but currently waiting for server response to ensure sync.
    const updated = { ...task, completed: !task.completed };

    axios.put(`${API_URL}/${id}`, updated)
      .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  const editTask = (id, newTitle, newDate) => {
    const task = tasks.find(t => t.id === id);
    const updated = { ...task, title: newTitle, dueDate: newDate !== "" ? newDate : null };

    axios.put(`${API_URL}/${id}`, updated)
      .then(() => setTasks(tasks.map(t => t.id === id ? updated : t)));
  };

  /**
   * Batch deletes all completed tasks.
   * Uses Promise.all to ensure all API calls finish before updating UI.
   */
  // const clearCompleted = () => {
  //   const completed = tasks.filter(t => t.completed);
  //   if (completed.length === 0) return;

  //   if (window.confirm(`Delete ${completed.length} completed tasks?`)) {
  //     Promise.all(completed.map(t => axios.delete(`${API_URL}/${t.id}`)))
  //       .then(() => setTasks(tasks.filter(t => !t.completed)))
  //       .catch(error => console.error("Batch delete failed:", error));
  //   }
  // }; // prev using alert box of java to confirm to delete all completed tasks 
 


const clearCompleted = () => {
  
  if (!isConfirmingClear) {
    setIsConfirmingClear(true);
    
    setTimeout(() => setIsConfirmingClear(false), 3000);
    return;
  }

  
  const completed = tasks.filter(t => t.completed);
  if (completed.length === 0) return;

  Promise.all(completed.map(t => axios.delete(`${API_URL}/${t.id}`)))
    .then(() => {
      setTasks(tasks.filter(t => !t.completed));
      setIsConfirmingClear(false); 
    })
    .catch(error => console.error("Batch delete failed:", error));
};



{tasks.some(t => t.completed) && (
  <button
    onClick={clearCompleted}
    style={{
      // ... keep your existing styles ...
      // Change color to Orange if confirming
      background: isConfirmingClear 
        ? "linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)"
        : "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)", 
    }}
  >
    {isConfirmingClear ? "Click Again to Confirm" : "Clear Completed"}
  </button>
)}


  // --- Helpers & Logic ---

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  // --- Theme Configuration ---
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
    <div style={{ minHeight: "100vh", backgroundColor: theme.bg, color: theme.text, padding: "50px 20px", fontFamily: "Arial, sans-serif", transition: "all 0.3s" }}>
      <div style={{ maxWidth: "500px", margin: "0 auto", textAlign: "center" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
          <h1 style={{ margin: 0 }}>My To-Do App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}
            title="Toggle Light/Dark Mode"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <TaskInput onAddTask={addTask} darkMode={darkMode} />

        <div style={{ margin: "20px 0" }}>
          <button onClick={() => setFilter('all')} style={btnStyle('all')}>All</button>
          <button onClick={() => setFilter('active')} style={btnStyle('active')}>Active</button>
          <button onClick={() => setFilter('completed')} style={btnStyle('completed')}>Completed</button>
        </div>

        <div style={{ background: theme.card, borderRadius: "10px", padding: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", transition: "all 0.3s" }}>
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
              background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
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
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px) scale(1.05)";
              e.target.style.boxShadow = "0 6px 20px rgba(255, 65, 108, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0) scale(1)";
              e.target.style.boxShadow = "0 4px 15px rgba(255, 65, 108, 0.4)";
            }}
          >
            Clear Completed
          </button>
        )}

      </div>
    </div>
  );
}

export default App;
// Vercel Deployment Test 1,finale