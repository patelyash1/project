import React, { useState } from 'react';
import { Check, Trash2, ChevronDown, ChevronUp, Calendar, Edit2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const TaskItem = ({ task, onToggle, onDelete, onEdit, accentColor = '#ef4444' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheck = (e) => {
    e.stopPropagation();
    onToggle(task.id);
    if (!task.completed) {
      const rect = e.target.getBoundingClientRect();
      confetti({ particleCount: 60, spread: 50, origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight }, colors: [accentColor, '#FFD700'] });
    }
  };
  // In TaskItem.js

const TaskItem = ({ task, onToggle, onDelete, onEdit, onSubtaskToggle, accentColor }) => {
  
  return (
    <div className="task-card">
        {/* Your Title and Description are here... */}
        <h3>{task.title}</h3>
        <p>{task.description}</p>

        {/* --- PASTE THIS NEW BLOCK FOR SUBTASKS --- */}
        <div className="subtasks-container" style={{ marginTop: '10px' }}>
            {task.subtasks && task.subtasks.map((subtask, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <input 
                        type="checkbox" 
                        checked={subtask.completed} 
                        onChange={() => onSubtaskToggle(task, index)}
                        style={{ cursor: 'pointer' }}
                    />
                    <span style={{ 
                        textDecoration: subtask.completed ? "line-through" : "none",
                        color: subtask.completed ? "#888" : "inherit"
                    }}>
                        {subtask.text}
                    </span>
                </div>
            ))}
        </div>
        {/* ----------------------------------------- */}

        {/* Your buttons (Edit/Delete) are down here... */}
    </div>
  );
};


  return (
    <div 
      className={`task-card ${task.completed ? 'completed' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        background: 'rgba(31, 41, 55, 0.6)', backdropFilter: 'blur(8px)', borderRadius: '8px',
        padding: '10px 14px', marginBottom: '8px', borderLeft: `4px solid ${task.completed ? '#10B981' : accentColor}`,
        cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(31, 41, 55, 0.9)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(31, 41, 55, 0.6)'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
        <div onClick={handleCheck} style={{ minWidth: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${task.completed ? '#10B981' : '#6B7280'}`, background: task.completed ? '#10B981' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {task.completed && <Check size={12} color="white" />}
        </div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: '500', color: '#F3F4F6', textDecoration: task.completed ? 'line-through' : 'none', opacity: task.completed ? 0.5 : 1 }}>{task.title}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             {task.dueDate && <small style={{ color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}><Calendar size={10}/> {new Date(task.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</small>}
             {isExpanded ? <ChevronUp size={16} color="#6B7280"/> : <ChevronDown size={16} color="#6B7280"/>}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {task.description && <p style={{ fontSize: '0.85rem', color: '#D1D5DB', marginBottom: '10px' }}>{task.description}</p>}
          {task.subtasks && task.subtasks.map((st, i) => (
            <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#9CA3AF', marginBottom: '2px' }}><div style={{ width: '4px', height: '4px', background: '#6B7280', borderRadius: '50%' }}></div><span>{st}</span></div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} style={{ background: 'transparent', color: '#60A5FA', border: '1px solid #60A5FA', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }}><Edit2 size={12} /> Edit</button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} style={{ background: 'transparent', color: '#EF4444', border: '1px solid #EF4444', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', gap: '4px', alignItems: 'center' }}><Trash2 size={12} /> Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default TaskItem;