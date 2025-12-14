import React from 'react';
import TaskItem from './TaskItem'; // Import the individual card component

// const TaskList = ({ tasks, onToggle, onDelete, onEdit, accentColor }) => {
  
//   // 1. Safety Check: If the list is empty, show a friendly message
//   if (!tasks || tasks.length === 0) {
//     return (
//       <div className="empty-state" style={{ textAlign: 'center', marginTop: '50px', color: '#9ca3af' }}>
//         <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>No tasks found here.</h3>
//         <p>Time to get productive!</p>
//       </div>
//     );
//   }

//   // 2. Render the List
//   return (
//     <div className="task-list-wrapper" style={{ paddingBottom: '80px' }}>
//       {tasks.map(task => (
//         <TaskItem 
//           key={task.id} 
//           task={task} 
//           onToggle={onToggle} 
//           onDelete={onDelete}
//           onEdit={onEdit}       // 👈 Pass the Edit handler down
//           accentColor={accentColor}
//         />
//       ))}
//     </div>
//   );
// };

// export default TaskList;

// In TaskList.js

// 1. Add onSubtaskToggle to the list of inputs


const TaskList = ({ tasks, onToggle, onDelete, onEdit, onSubtaskToggle, accentColor }) => {
  
  if (!tasks || tasks.length === 0) {
     return <div className="empty-state">No tasks found here.</div>;
  }

  return (
    <div className="task-list-wrapper">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onToggle={onToggle} 
          onDelete={onDelete}
          onEdit={onEdit}
          // 2. Pass it down here
          onSubtaskToggle={onSubtaskToggle} 
          accentColor={accentColor}
        />
      ))}
    </div>
  );
};

export default TaskList;