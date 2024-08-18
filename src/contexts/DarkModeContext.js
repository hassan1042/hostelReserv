import React, { createContext, useContext, useState } from 'react';

const DarkModeContext = createContext();

export const useDark = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode, }}>
      {children}
    </DarkModeContext.Provider>
  );
};
