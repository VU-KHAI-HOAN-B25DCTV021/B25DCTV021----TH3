import React from 'react';
import { useTheme } from '../context/ThemeContext';
import useClock from '../hooks/useClock';

function Header() {
  const { isDark, toggleTheme } = useTheme();
  const { formattedTime, formattedDate } = useClock();

  return (
    <div className="header">
      <button className="theme-toggle" onClick={toggleTheme}>
        {isDark ? '☀️' : '🌙'}
      </button>
      <h1>💰 Sổ Chi Tiêu Cá Nhân</h1>
      <div className="clock">
        🕐 {formattedTime} — {formattedDate}
      </div>
    </div>
  );
}

export default Header;

