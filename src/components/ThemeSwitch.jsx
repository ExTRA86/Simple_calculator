import React, { useContext } from 'react';
import c from '../App.module.css';
import { ThemeContext } from '../App';

const ThemeSwitch = () => {
  const { isDark, setIsDark, isLight, setIsLight, isGray, setIsGray, theme } =
    useContext(ThemeContext);

  function themes(color) {
    if (color === 'dark') {
      setIsDark(true);
      setIsLight(false);
      setIsGray(false);
    } else if (color === 'light') {
      setIsDark(false);
      setIsLight(true);
      setIsGray(false);
    } else if (color === 'gray') {
      setIsDark(false);
      setIsLight(false);
      setIsGray(true);
    }
  }

  function toggleThemes() {
    if (isDark && !isLight && !isGray) {
      setIsDark(false);
      setIsLight(true);
      setIsGray(false);
    } else if (!isDark && isLight && !isGray) {
      setIsDark(false);
      setIsLight(false);
      setIsGray(true);
    } else if (!isDark && !isLight && isGray) {
      setIsDark(true);
      setIsLight(false);
      setIsGray(false);
    }
  }

  return (
    <div className={theme(c.themes)}>
      <label>Themes</label>
      <div>
        <button onClick={() => themes('dark')}>Dark</button>
        <button onClick={() => themes('light')}>Light</button>
        <button onClick={() => themes('gray')}>Gray</button>
        <button onClick={() => toggleThemes()}>Switch</button>
      </div>
    </div>
  );
};

export default ThemeSwitch;
