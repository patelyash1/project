import React from 'react';
import { Folder, Calendar, Star, Clock, Plus, Settings, User } from 'lucide-react';

const Sidebar = ({ folders, activeFolder, setActiveFolder, onAddFolder, onSettingsClick }) => {
  const smartFilters = [
    { id: 'Today', name: 'Today', icon: <Star size={20} /> },
    { id: 'Upcoming', name: 'Upcoming', icon: <Calendar size={20} /> },
    { id: 'Missed', name: 'Missed', icon: <Clock size={20} /> },
  ];

  const handleAddClick = () => {
    const name = prompt("Enter folder name:");
    if (name) onAddFolder(name);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header"><h2>TaskMaster</h2></div>
      <div className="section">
        <p className="section-title">Overview</p>
        <ul>
          {smartFilters.map(filter => (
            <li key={filter.id} className={activeFolder === filter.id ? 'active' : ''} onClick={() => setActiveFolder(filter.id)}>
              {filter.icon} <span>{filter.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="section">
        <div className="section-header">
          <p className="section-title">Projects</p>
          <button onClick={handleAddClick} className="add-folder-btn"><Plus size={18}/></button>
        </div>
        <ul>
          {folders.map(folder => (
            <li key={folder.id} className={activeFolder === folder.name ? 'active' : ''} onClick={() => setActiveFolder(folder.name)}>
              <Folder size={20} /> <span>{folder.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">
        <div className="user-profile">
          <div style={{ width: '36px', height: '36px', background: '#374151', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} /></div>
          <span>Yash Patel</span>
        </div>
        <button onClick={onSettingsClick} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}><Settings size={22} /></button>
      </div>
    </aside>
  );
};
export default Sidebar;