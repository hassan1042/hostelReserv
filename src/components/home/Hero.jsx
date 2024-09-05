import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase/Firebase';
import { useHostel } from '../../contexts/HostelContext';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  const [hostels, setHostels] = useState([]);
  const { selectHostel } = useHostel();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'hostels'));
      const hostelsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHostels(hostelsList);
    };

    fetchHostels();
  }, []);

  const handleImageClick = (hostel) => {
    selectHostel(hostel);
    navigate('/hostel-details');
  };

  // Function to handle mouse movement and apply hover parallax effect
  const handleMouseMove = (e, index) => {
    const image = document.querySelectorAll(`.parallax-img`)[index];
    const { left, top, width, height } = image.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    const moveX = (x - 0.5) * 30; // Adjusts horizontal movement (smaller value = slower movement)
    const moveY = (y - 0.5) * 30; // Adjusts vertical movement (smaller value = slower movement)
    
    image.style.transform = `translate(${moveX}px, ${moveY}px)`; 
  };

  const handleMouseLeave = (index) => {
    const image = document.querySelectorAll(`.parallax-img`)[index];
    image.style.transform = `translate(0, 0)`; // Reset position on mouse leave
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  return (
    <section className="h-96 flex justify-center items-center container mx-auto">
      <div className="w-full h-full">
        <Slider {...settings}>
          {hostels.map((hostel, index) => (
            <div 
              key={hostel.id} 
              onClick={() => handleImageClick(hostel)} 
              className="cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {hostel.images && (
                <div className='h-96 w-full overflow-hidden relative parallax-img'>
                  <img 
                    className="h-80 w-full object-cover"
                    src={hostel.images[0]} 
                    alt="" 
                  />
                  <div className='flex max-sm:space-x-2 justify-center sm:justify-around items-center mt-5 mb-10'>
                    <h2 className="text-xl md:text-2xl xl:text-4xl font-bold">{hostel.name}</h2>
                    <div className='flex justify-center items-center space-x-4'>
                      <span><FaMapMarkerAlt/></span>
                      <p className="text-lg md:text-xl xl:text-3xl font-semibold ">{hostel.location}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Hero;
