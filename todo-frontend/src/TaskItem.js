import React, { useState } from 'react';
import confetti from 'canvas-confetti'; // 👈 IMPORT THIS

function TaskItem({ task, toggleComplete, deleteTask, editTask, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDate, setNewDate] = useState(task.dueDate || ""); 

  const handleSave = () => {
    editTask(task.id, newTitle, newDate); 
    setIsEditing(false);
  };

  // 👇 NEW: Handle the confetti logic here
  const handleCheckboxChange = () => {
    // If we are turning it ON (it was false, now becoming true)
    if (!task.completed) {
      // Fire confetti from the center of the screen
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#BB86FC', '#03DAC6', '#FF416C'] // Match your theme colors
      });
    }
    // Actually toggle the task
    toggleComplete(task.id);
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "4px",
    border: darkMode ? "1px solid #555" : "1px solid #ccc",
    backgroundColor: darkMode ? "#333" : "white",
    color: darkMode ? "white" : "black"
  };

  return (
    <div style={{ 
      display: "flex", alignItems: "center", justifyContent: "space-between",
      borderBottom: darkMode ? "1px solid #333" : "1px solid #eee", 
      padding: "15px 10px",
      transition: "all 0.3s",
      // 👇 Dim the whole row if completed
      opacity: task.completed ? 0.5 : 1, 
      transform: task.completed ? "scale(0.98)" : "scale(1)" 
    }}>
      
      {/* CHECKBOX WITH ZOOM EFFECT */}
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={handleCheckboxChange} // 👈 Use our new function
        style={{ 
          marginRight: "15px", 
          width: "20px", 
          height: "20px", 
          accentColor: "#BB86FC", 
          cursor: "pointer",
          transition: "transform 0.2s" // Smooth zoom on click
        }}
      />

      {isEditing ? (
        <div style={{ flexGrow: 1, display: "flex", gap: "10px" }}>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ ...inputStyle, flexGrow: 1 }} />
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} style={inputStyle} />
          <button onClick={handleSave} style={{ backgroundColor: "#03DAC6", color: "black", border: "none", borderRadius: "4px", padding: "0 15px", cursor: "pointer" }}>Save</button>
        </div>
      ) : (
        <div style={{ flexGrow: 1, textAlign: "left", transition: "color 0.3s" }}>
            <span 
              style={{ 
                textDecoration: task.completed ? "line-through" : "none", 
                color: task.completed ? "gray" : (darkMode ? "white" : "black"), // Fade text if done
                fontSize: "1.1rem", 
                cursor: "pointer" 
              }}
              onDoubleClick={() => setIsEditing(true)}
              title="Double click to edit"
            >
              {task.title}
            </span>
            {task.dueDate && (
                <span style={{ fontSize: "0.85rem", color: "#BB86FC", marginLeft: "12px", border: "1px solid #BB86FC", padding: "2px 6px", borderRadius: "4px" }}>
                    📅 {Array.isArray(task.dueDate) ? task.dueDate.join("-") : task.dueDate}
                </span>
            )}
        </div>
      )}

      <button 
        onClick={() => deleteTask(task.id)}
        style={{ marginLeft: "15px", color: "#CF6679", background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer" }}
      >
        ✕
      </button>
    </div>
  );
}

export default TaskItem;