import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { getDocs, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../../firebase/Firebase';
import { useHostel } from '../../contexts/HostelContext';
import { FaBed, FaMapMarkerAlt } from 'react-icons/fa';

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade:true,
  };

  return (
    <section className="h-96 flex justify-center items-center container mx-auto">
      <div className="w-full h-full">
        <Slider {...settings}>
          {hostels.map((hostel) => (
            <div key={hostel.id} onClick={() => handleImageClick(hostel)} className="cursor-pointer">
              {hostel.images && (
                <div
                className='h-96 w-full'
                  // style={{ backgroundImage: `url(${hostel.images[0]})` }}
                >
                <img 
                  className="h-80 w-full text-white"
                 src={hostel.images[0]} alt="" />
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
