// import React, { useState } from 'react';

// function TaskInput({ onAddTask }) {
//     const [task, setTask] = useState("");
//     const [date, setDate] = useState(""); // 1. State for the date

//     const handleClick = () => {
//         if(task.trim()) { 
//             onAddTask(task, date); // 2. Send BOTH text and date to App.js
//             setTask(""); 
//             setDate(""); // Clear both after sending
//         }
//     };

//     return (
//         <div style={{ margin: "20px", display: "flex", justifyContent: "center", gap: "10px" }}>
//             <input 
//                 type="text" 
//                 placeholder="What needs to be done?" 
//                 value={task}
//                 onChange={(e) => setTask(e.target.value)}
//                 onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }} 
//                 style={{ padding: "10px", width: "300px" }}
//             />

//             {/* 👇 THIS IS THE MISSING CALENDAR OPTION 👇 */}
//             <input 
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 style={{ padding: "10px", cursor: "pointer" }}
//             />

//             <button onClick={handleClick} style={{ padding: "10px 20px" }}>
//                 Add
//             </button>
//         </div>
//     );
// }

// export default TaskInput;

import React, { useState } from 'react';

// 👇 Accept 'darkMode'
function TaskInput({ onAddTask, darkMode }) {
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");

    const handleClick = () => {
        if(task.trim()) { 
            onAddTask(task, date); 
            setTask(""); 
            setDate("");
        }
    };

    const inputStyle = {
        padding: "12px",
        borderRadius: "5px",
        // 👇 Dynamic Border & Background
        border: darkMode ? "1px solid #333" : "1px solid #ddd",
        backgroundColor: darkMode ? "#2C2C2C" : "white",
        color: darkMode ? "white" : "black",
        outline: "none",
        transition: "all 0.3s"
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input 
                type="text" 
                placeholder="Add a new task..." 
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }} 
                style={{ ...inputStyle, flexGrow: 1 }} 
            />
            <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
            />
            <button onClick={handleClick} style={{ 
                padding: "0 20px", 
                backgroundColor: "#BB86FC", 
                color: "black", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer",
                fontWeight: "bold"
            }}>
                Add
            </button>
        </div>
    );
}

export default TaskInput;