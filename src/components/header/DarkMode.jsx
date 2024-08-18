import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useDark } from '../../contexts/DarkModeContext';


function DarkMode() {

    const { darkMode , setDarkMode } = useDark();


    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        if(darkMode){
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
         
        console.log(darkMode);
        }
  return (
    <div className="dark-mode-toggle">
    <div
      className={`icon-container ${darkMode ? 'rotate-moon' : 'rotate-sun'}`}
      onClick={handleDarkMode}
    >
      <FontAwesomeIcon
        icon={darkMode ? faMoon : faSun}
        className={` dark-mode-icon text-3xl ${darkMode ? 'text-neutral-300' : 'text-yellow-500'}  cursor-pointer`}
      />
    </div>
  </div>
  )
}

export default DarkMode
