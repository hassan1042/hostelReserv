import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { useHostel } from '../../contexts/HostelContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../common/Card';

function Featured() {
  const [featuredHostels, setFeaturedHostels] = useState([]);
  const { selectHostel } = useHostel();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'hostels'));
        const allHostels = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Filter hostels to only include those with featured set to true
        const featured = allHostels.filter(hostel => hostel.featured === true);

        // Shuffle and select a subset (if needed)
        const shuffledHostels = featured.sort(() => 0.5 - Math.random());
        setFeaturedHostels(shuffledHostels.slice(0, 6)); // Adjust the number to show more or fewer hostels
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  const handleCardClick = (hostel) => {
    selectHostel(hostel);
    navigate('/hostel-details');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <section
     data-aos="fade-right"
     data-aos-duration="3000"
     className="my-10  container mx-auto">
      <h2 className="text-2xl font-bold mb-4  text-textDark dark:text-text">Featured Hostels</h2>
      {/* <Slider {...settings}>
        {featuredHostels.map((hostel) => (
          <div key={hostel.id} className="px-2">
            <div className="border rounded-lg shadow-lg overflow-hidden cursor-pointer" onClick={() => handleCardClick(hostel)}>
              {hostel.images && (
                <img src={hostel.images[0]} alt={hostel.name} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold">{hostel.name}</h3>
                <p className="text-gray-600">{hostel.location}</p>
                <p className="text-gray-600 flex justify-start items-center space-x-2">
                  <span>Beds: {hostel.beds}</span>
                </p>
                <p className="text-gray-600 flex justify-start items-center space-x-2">
                  <span>Bathrooms: {hostel.bathroom}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider> */}
      <Card hostels={featuredHostels}/>
    </section>
  );
}

export default Featured;
