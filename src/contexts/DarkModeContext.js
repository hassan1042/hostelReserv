import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const DarkModeContext = createContext();

// Custom hook for using dark mode context
export const useDark = () => useContext(DarkModeContext);

// Dark mode provider
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Check the browser's theme preference
  useEffect(() => {
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set dark mode based on the user's preference or system setting
    setDarkMode(userPrefersDark);
    if (userPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update theme when dark mode is toggled
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
