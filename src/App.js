import Calculator from './components/calculator';
import c from './App.module.css';
import { createContext, useState } from 'react';
import classNames from 'classnames';

export const ThemeContext = createContext(null);

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [isGray, setIsGray] = useState(false);

  const theme = cs =>
    classNames(cs, {
      [c.dark]: isDark,
      [c.light]: isLight,
      [c.gray]: isGray,
    });

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        isLight,
        setIsLight,
        isGray,
        setIsGray,
        theme,
      }}
    >
      <div className={c.container}>
        <Calculator />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
