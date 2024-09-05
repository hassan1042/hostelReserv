import React from 'react';
import { Outlet } from 'react-router-dom';
// Component imports
import Navbar from '../components/header/Navbar';
import Footer from '../components/footer/Footer';



const Layout = () => {
  return (
    <div>
      <Navbar  />
      <main className='min-h-[80vh]'>
      <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
