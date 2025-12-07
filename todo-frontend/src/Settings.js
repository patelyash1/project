import React from 'react';
import { Moon, Sun, Check, Image as ImageIcon } from 'lucide-react';

const Settings = ({ 
  darkMode, setDarkMode, 
  currentBg, changeBackground, backgroundThemes,
  accentColor, setAccentColor
}) => {

  // Professional Color Palettes
  const accentColors = [
    { id: 'purple', val: '#6200EE' },
    { id: 'blue', val: '#2962FF' },
    { id: 'green', val: '#00C853' },
    { id: 'orange', val: '#FF6D00' },
    { id: 'pink', val: '#C51162' },
  ];

  return (
    <div className="settings-container" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '40px', color: darkMode ? 'white' : '#333' }}>Settings</h1>

      {/* 1. APPEARANCE SECTION */}
      <section className="settings-section">
        <h3>Appearance</h3>
        
        <div className="setting-item">
          <span>Dark Mode</span>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="toggle-btn"
            style={{ background: darkMode ? accentColor : '#ddd' }}
          >
            <div className={`toggle-circle ${darkMode ? 'on' : 'off'}`}>
              {darkMode ? <Moon size={12} /> : <Sun size={12} />}
            </div>
          </button>
        </div>

        <div className="setting-item">
          <span>Accent Color</span>
          <div className="color-grid">
            {accentColors.map(col => (
              <button
                key={col.id}
                onClick={() => setAccentColor(col.val)}
                style={{ 
                  backgroundColor: col.val,
                  border: accentColor === col.val ? `2px solid ${darkMode ? 'white' : 'black'}` : 'none'
                }}
                className="color-swatch"
              >
                {accentColor === col.val && <Check size={14} color="white" />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. BACKGROUNDS SECTION */}
      <section className="settings-section">
        <h3>Background Wallpaper</h3>
        <div className="bg-grid">
          {backgroundThemes.map(bg => (
            <div 
              key={bg.id} 
              className={`bg-card ${currentBg === bg.url ? 'active' : ''}`}
              onClick={() => changeBackground(bg.url)}
              style={{ borderColor: currentBg === bg.url ? accentColor : 'transparent' }}
            >
              {bg.url ? (
                <img src={bg.url} alt={bg.name} />
              ) : (
                <div className="no-bg"><ImageIcon size={24}/></div>
              )}
              <p>{bg.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Settings;