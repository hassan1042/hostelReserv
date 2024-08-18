import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Slider from 'react-slick';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners'; // Ensure this is imported if you're using it
import { firestore } from '../../firebase/Firebase';

// Slick carousel settings
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
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'websiteTestimonials'));
        const testimonialsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTestimonials(testimonialsList);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleTestimonialClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
  };

  const handleCloseModal = () => {
    setSelectedTestimonial(null);
  };

  return (
    <section className="my-10 bg-gray-100 p-6 ">
      <h2 className="text-2xl font-bold mb-4">What Our Users Say</h2>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
       <div className='  container mx-auto '>
       <Slider {...settings}>
          {testimonials.map(({ id, message, username, dateOfStay }) => (
            <div
              key={id}
              className="bg-white  p-6 rounded-lg shadow-md text-center h-56 cursor-pointer"
              onClick={() => handleTestimonialClick({ message, username, dateOfStay })}
            >
              <div className="relative h-[80%] bg-gray-200 p-4 flex items-center justify-center ">
                <FaQuoteLeft className="absolute top-0 left-2 text-gray-500 text-3xl" />
                <p className="text-xl text-gray-700 mx-4 text-center">{message}</p>
                <FaQuoteRight className="absolute bottom-0 right-2 text-gray-500 text-3xl" />
              </div>
              <p className="text-gray-600 mt-2">- {username}</p>
              <p className="text-gray-400 text-sm">{new Date(dateOfStay).toLocaleDateString()}</p>
            </div>
          ))}
        </Slider>
       </div>
      )}

      {/* Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-11/12 max-w-3xl relative">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-600 text-2xl">
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">Testimonial Details</h3>
            <div className="relative mb-4">
              <FaQuoteLeft className="absolute top-0 left-4 text-gray-500 text-4xl" />
              <p className="text-xl text-gray-700 mx-8 text-center">{selectedTestimonial.message}</p>
              <FaQuoteRight className="absolute bottom-0 right-4 text-gray-500 text-4xl" />
            </div>
            <p className="text-gray-600 font-semibold">- {selectedTestimonial.username}</p>
            <p className="text-gray-400 text-sm">{new Date(selectedTestimonial.dateOfStay).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
