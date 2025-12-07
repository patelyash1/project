import React from 'react';
import { Folder, Calendar, Star, Clock, Plus, Settings } from 'lucide-react';

const Sidebar = ({ 
  folders, activeFolder, setActiveFolder, onAddFolder, onSettingsClick, 
  darkMode // 👈 NEW PROP
}) => {
  
  const smartFilters = [
    { id: 'today', name: 'Today', icon: <Star size={18} /> },
    { id: 'upcoming', name: 'Upcoming', icon: <Calendar size={18} /> },
    { id: 'expired', name: 'Missed', icon: <Clock size={18} /> },
  ];

  // Dynamic Styles
  const sidebarStyle = {
    background: darkMode ? '#1E1E1E' : 'white',
    color: darkMode ? '#E0E0E0' : '#333',
    borderRight: `1px solid ${darkMode ? '#333' : '#e0e0e0'}`
  };

  const itemHoverStyle = darkMode ? 'rgba(255,255,255,0.1)' : '#f0ebfa';

  return (
    <aside className="sidebar" style={sidebarStyle}>
      <div className="sidebar-header">
        <h2 style={{ color: darkMode ? '#BB86FC' : '#6200EE' }}>TaskMaster</h2>
      </div>

      {/* SMART FILTERS */}
      <div className="section">
        <p className="section-title" style={{ color: darkMode ? '#888' : '#888' }}>Filters</p>
        <ul>
          {smartFilters.map(filter => (
            <li 
              key={filter.id}
              className={activeFolder === filter.id ? 'active' : ''}
              onClick={() => setActiveFolder(filter.id)}
              style={{ color: darkMode ? '#eee' : '#555' }}
            >
              {filter.icon} <span>{filter.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FOLDERS */}
      <div className="section">
        <div className="section-header">
          <p className="section-title">Projects</p>
          <button onClick={onAddFolder} className="add-folder-btn"><Plus size={16}/></button>
        </div>
        <ul>
          {folders.map(folder => (
            <li 
              key={folder.id} 
              className={activeFolder === folder.id ? 'active' : ''}
              onClick={() => setActiveFolder(folder.id)}
              style={{ color: darkMode ? '#eee' : '#555' }}
            >
              <Folder size={18} /> <span>{folder.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-footer" style={{ borderTop: `1px solid ${darkMode ? '#333' : '#eee'}` }}>
        <div className="user-profile">
          <div style={{ width: '30px', height: '30px', background: '#6200EE', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Y</div>
          <span>Yash Patel</span>
        </div>
        <Settings size={20} className="settings-icon" onClick={onSettingsClick} style={{ cursor: 'pointer', color: '#888' }} />
      </div>
    </aside>
  );
};

export default Sidebar;