import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

const TaskForm = ({ folders, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({ title: '', description: '', date: '', folder: folders[0]?.name || 'Inbox', subtasks: [] });
  const [tempSubtask, setTempSubtask] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        date: initialData.dueDate ? initialData.dueDate.substring(0, 16) : '', 
        folder: initialData.folder || 'Inbox',
        subtasks: initialData.subtasks || []
      });
    }
  }, [initialData]);

  const addSubtask = (e) => {
    e.preventDefault();
    if (!tempSubtask.trim()) return;
    setFormData({ ...formData, subtasks: [...formData.subtasks, tempSubtask] });
    setTempSubtask('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>{initialData ? 'Edit Task' : 'New Task'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer' }}><X /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input placeholder="Task Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} autoFocus style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: '#111827', color: 'white', fontSize: '1.1rem' }} />
          <div style={{ display: 'flex', gap: '10px' }}>
             <select value={formData.folder} onChange={e => setFormData({...formData, folder: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #374151', background: '#111827', color: 'white' }}>{folders.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}</select>
             <input type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #374151', background: '#111827', color: 'white' }} />
          </div>
          <textarea placeholder="Description..." rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #374151', background: '#111827', color: 'white', fontFamily: 'inherit' }} />
          <div style={{ background: '#111827', padding: '12px', borderRadius: '8px', border: '1px solid #374151' }}>
             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input placeholder="Add subtask..." value={tempSubtask} onChange={e => setTempSubtask(e.target.value)} style={{ flex: 1, padding: '8px', background: '#1f2937', border: 'none', borderRadius: '4px', color: 'white' }} />
                <button onClick={addSubtask} style={{ background: '#374151', border: 'none', borderRadius: '4px', width: '32px', color: 'white' }}>+</button>
             </div>
             <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {formData.subtasks.map((st, i) => (
                  <li key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #374151', fontSize: '0.9rem', color: '#d1d5db' }}><span>• {st}</span><button type="button" onClick={() => setFormData({ ...formData, subtasks: formData.subtasks.filter((_, idx) => idx !== i) })} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14}/></button></li>
                ))}
             </ul>
          </div>
          <button type="submit" style={{ padding: '14px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '1rem' }}>{initialData ? 'Save Changes' : 'Create Task'}</button>
        </form>
      </div>
    </div>
  );
};
export default TaskForm;