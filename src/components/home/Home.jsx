// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';
import { ClipLoader } from 'react-spinners';
import NewsLetter from './NewsLetter';
import Working from './Working';
import Categories from './Categories';
import Featured from './Featured';
import CountUpSection from './CountUp';
import Testimonials from './Testimonials';
import Hero from './Hero';
import SubmitTestimonial from './SubmitTestimonials';
import LatestHostels from './RecentHostels';
import Card from '../common/Card';
import './home.css';
import WA from './WA';
import LoadingScreen from '../../components/common/loading/Loading';



const Home = () => {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(firestore, 'hostels'));
        const hostelsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHostels(hostelsList);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
      setLoading(false);
    };

    fetchHostels();
  }, []);




  return (
    <div className="relative bg-bgPrimary dark:bg-bgPrimaryDark">
      {loading && (
        <div className=" inset-0 flex justify-center items-center  z-50 fixed h-full w-full bg-gray-200">
          {/* <ClipLoader size={50} color={"#123abc"} loading={loading}  /> */}
          <LoadingScreen/>
        </div>
      )}

      <div className=" mx-auto pb-5">
        {/* Hero Section */}
        <Hero />
        {/* Popular Hostels */}
        <section
         data-aos="fade-up"
     data-aos-duration="3000"
     dara-aos-once="true"
         className="my-10 container mx-auto">
          <h2 className="text-2xl font-bold mb-4 dark:text-text text-textDark">Popular Hostels</h2>
          {!loading && (
    <Card hostels={hostels}/>
          )}
        </section>
        {/* CountUp */}
        <CountUpSection />        
        {/* Hostel Categories */}
        <Categories />
        {/* Featured Hostels */}
        <Featured />
        {/* User Testimonials */}
        <Testimonials />
        {/* How It Works */}
        <Working />
        {/* Latest Hostels */}
        <LatestHostels/>
        {/* Form for Submitting testimonial */}
       <SubmitTestimonial/>
        {/* Newsletter Signup */}
        <NewsLetter />
      </div>
        {/* Whatsapp icon */}
      <div className=' absolute top-96 right-10 p-16'>
       <WA/>                        
      </div>
    </div>
  );
};

export default Home;
