import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import AOS from 'aos';
import 'aos/dist/aos.css';
import RegisterHostel from './components/registration/Registration';
import HostelDetails from './components/details/HostelDetails';
import Layout from './layout/Layout';
import { HostelProvider } from './contexts/HostelContext';
import { AuthProvider } from './contexts/AuthContext';
import { SearchProvider } from './contexts/SearchContext';
import SearchResults from './components/search/SearchResults';
import './App.css'
import { useEffect } from 'react';
import { DarkModeProvider } from './contexts/DarkModeContext';
import Dashboard from './components/header/Dashboard';
import OwnerMessages from './components/chat/OwnerMessages';
import Chats from './components/chat/Chats';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: false, // Animation will occur only once when scrolling down
    });
  }, []);

  
  return (
    <div className='overflow-hidden'>
    <AuthProvider>
    <HostelProvider>
    <SearchProvider>
    <DarkModeProvider>
   <Router>
    <Routes>
      <Route element={<Layout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/register-hostel" element={<RegisterHostel />} />
      <Route path="/hostel-details" element={<HostelDetails />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/messages" element={<Chats/>} />
      </Route>
    </Routes>
   </Router>
   </DarkModeProvider>
   </SearchProvider>
</HostelProvider>
</AuthProvider>
</div>
  );
}

export default App;
