// src/context/HostelContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const HostelContext = createContext();

export const useHostel = () => {
  return useContext(HostelContext);
};

export const HostelProvider = ({ children }) => {
  const [selectedHostel, setSelectedHostel] = useState(() => {
    // Retrieve the hostel from local storage or return null if not found
    const savedHostel = localStorage.getItem('selectedHostel');
    return savedHostel ? JSON.parse(savedHostel) : null;
  });

  const selectHostel = (hostel) => {
    setSelectedHostel(hostel);
    localStorage.setItem('selectedHostel', JSON.stringify(hostel));
  };

  useEffect(() => {
    // Update local storage whenever the selectedHostel changes
    localStorage.setItem('selectedHostel', JSON.stringify(selectedHostel));
  }, [selectedHostel]);

  return (
    <HostelContext.Provider value={{ selectedHostel, selectHostel }}>
      {children}
    </HostelContext.Provider>
  );
};
