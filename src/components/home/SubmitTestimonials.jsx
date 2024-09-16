// src/components/SubmitTestimonial.js
import React, { useState } from 'react';
import { addTestimonial } from '../../services/webTestimonials'; // Make sure to adjust the import path

const SubmitTestimonial = () => {
  const [formData, setFormData] = useState({
    message: '',
    username: '',
    dateOfStay: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTestimonial(formData);
      alert('Testimonial submitted successfully!');
      setFormData({ message: '', username: '', dateOfStay: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      alert('Failed to submit testimonial.');
    }
  };

  return (
    <section className="mt-10 bg-gray-100 dark:bg-cardDark p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 container mx-auto  text-textDark dark:text-text">Views About Our Website</h2>
      <form onSubmit={handleSubmit} className="space-y-4 container mx-auto">
        <div>
          <label className="block text-gray-700  dark:text-gray-300 font-semibold">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border  border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            required
          />
        </div>
        <div className='flex flex-wrap justify-between  items-center max-md:space-y-4 md:space-x-8'>
        <div className='w-full md:w-[40%]' >
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border  border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            required
          />
        </div>
        <div className='w-full md:w-[40%] '>
          <label className="block text-gray-700 dark:text-gray-300 font-semibold">Date of Stay</label>
          <input
            type="date"
            name="dateOfStay"
            value={formData.dateOfStay}
            onChange={handleChange}
            className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            required
          />
        </div>
        </div>
      <div className=' w-full  text-center'>
      <button type="submit" className="px-4 py-2 bg-hov hover:bg-hovDark text-white rounded ">
          Submit Testimonial
        </button>
      </div>
      </form>
    </section>
  );
};

export default SubmitTestimonial;
