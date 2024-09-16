import React, { useState } from 'react';
import { addHostel, uploadFile } from '../../services/addHostel';
import LoginPage from '../common/auth/LoginPage';
import { useAuth } from '../../contexts/AuthContext';
import { serverTimestamp } from 'firebase/firestore'; // Import this for adding the timestamp
import Modal from '../common/Modal';
import LoadingPage from './HostelSubmissionLoading';

const RegisterHostel = () => {
  const { currentUser } = useAuth();
  const [hostel, setHostel] = useState({
    name: '',
    location: '',
    beds: '',
    bathroom: 'attached',
    wifi: 'available',
    mess: 'available',
    ground: 'available',
    canteen: 'available',
    mosque: 'available',
    description: '',
    images: [],
    video: null,
    contact: '',
    booking: '', 
    instruction: '',
    price: '',
    featured: false,
    lat: 34.7615, // Default latitude (Swat, Pakistan)
    lng: 72.3528,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For submission effect
  const [modalMessage, setModalMessage] = useState(''); // For popup messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHostel({ ...hostel, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === 'video') {
      // Ensure only video files are selected
      if (files.length > 1 || !files[0].type.startsWith('video/')) {
        setError('Please upload only one video file.');
        return;
      }
    }

    setError('');
    setHostel({ ...hostel, [name]: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading effect

    // Check if all fields are filled
    if (
      !hostel.name ||
      !hostel.location ||
      !hostel.beds ||
      !hostel.bathroom ||
      !hostel.description ||
      hostel.images.length === 0 ||
      !hostel.contact ||
      !hostel.booking ||
      !hostel.instruction ||
      !hostel.canteen ||
      !hostel.ground ||
      !hostel.mess ||
      !hostel.mosque ||
      !hostel.price
    ) {
      setError('All fields must be filled out.');
      setLoading(false); // Stop loading effect
      return;
    }

    try {
      const imageUrls = await Promise.all(
        Array.from(hostel.images).map((file) => uploadFile(file, 'images'))
      );
      const videoUrl = hostel.video ? await uploadFile(hostel.video[0], 'videos') : null;

      const newHostel = {
        ...hostel,
        images: imageUrls,
        video: videoUrl,
        ownerId: currentUser.uid,
        addedDate: serverTimestamp(), // Add the current timestamp
      };

      const hostelId = await addHostel(newHostel);
      console.log('Hostel added with ID:', hostelId);
      setModalMessage('Hostel added successfully!');
    } catch (error) {
      console.error('Failed to add hostel:', error);
      setModalMessage('Failed to add hostel. Please try again.');
    } finally {
      setLoading(false); // Stop loading effect
    }
  };

  if (!currentUser) {
    return <LoginPage />;
  }
  if (loading) {
    return <LoadingPage/>;
  
  }

  return (
  <div className='dark:bg-cardDark py-10 '>
      <div className="container mx-auto   ">
      <h1 className="text-2xl font-bold mb-4 max-md:text-center  text-textDark dark:text-text">Register your Hostel</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">


<div className='flex flex-wrap justify-between items-center'>
<div className='w-[90%] max-md:mx-auto md:w-[30%]'>
  <label className="block text-gray-700 dark:text-neutral-200">Hostel Name</label>
  <input
    type="text"
    name="name"
    value={hostel.name}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1 "
  />
</div>
<div className='w-[90%] max-md:mx-auto lg:w-[60%]'>
  <label className="block text-gray-700 dark:text-neutral-200">Address</label>
  <input
    type="text"
    name="location"
    value={hostel.location}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>
</div>

{/** Beds Bathrooms price */}
<div className='flex flex-wrap justify-between items-center dark:text-text  '>
<div className='max-md:flex max-md:items-center max-md:w-[90%] max-md:mx-auto'>
  <label className="block text-gray-700 max-md:w-[30%] dark:text-neutral-200 "><span className='max-md:hidden'>Number</span> <span className='md:hidden'>No</span> of Beds</label>
  <input
    type="number"
    name="beds"
    value={hostel.beds}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1 max-md:w-[65%]"
  />
</div>


<div className='max-md:w-[90%] max-md:mx-auto max-md:my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Bathroom</label>
  <div className="flex space-x-4">
    <label>
      <input
        type="radio"
        name="bathroom"
        value="attached"
        checked={hostel.bathroom === 'attached'}
        onChange={handleChange}
        className="mr-2"
      />
      Attached
    </label>
    <label>
      <input
        type="radio"
        name="bathroom"
        value="separate"
        checked={hostel.bathroom === 'separate'}
        onChange={handleChange}
        className="mr-2"
      />
      Separate
    </label>
  </div>


</div>
<div className='max-md:w-[90%] max-md:mx-auto max-md:my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Wifi</label>
  <div className="flex space-x-4">
    <label>
      <input
        type="radio"
        name="wifi"
        value="available"
        checked={hostel.wifi === 'available'}
        onChange={handleChange}
        className="mr-2"
      />
      Available
    </label>
    <label>
      <input
        type="radio"
        name="wifi"
        value="unavailable"
        checked={hostel.wifi === 'unavailable'}
        onChange={handleChange}
        className="mr-2"
      />
      Un-Available
    </label>
  </div>
</div>
<div className='max-md:flex max-md:items-center max-md:w-[90%] max-md:mx-auto'>
  <label className="block text-gray-700 max-md:text-sm max-md:w-[40%] dark:text-neutral-200">Price per Month</label>
  <input
    type="number"
    name="price"
    value={hostel.price}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1 max-md:w-[60%]"
  />
</div>

</div>
<div className='max-md:w-[90%] max-md:mx-auto'>
  <label className="block text-gray-700 dark:text-neutral-200">Description</label>
  <textarea
    name="description"
    value={hostel.description}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>

<div className='flex flex-wrap justify-between items-center'>
  
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Upload Images</label>
  <input
    type="file"
    name="images"
    multiple
    onChange={handleFileChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Upload Video</label>
  <input
    type="file"
    name="video"
    onChange={handleFileChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Contact Number (WhatsApp)</label>
  <input
    type="number"
    name="contact"
    value={hostel.contact}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>
</div>


<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Booking Information</label>
  <input
    type="text"
    name="booking"
    value={hostel.booking}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Special Instructions</label>
  <input
    type="text"
    name="instruction"
    value={hostel.instruction}
    onChange={handleChange}
    className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
  />
</div>
<div className="flex space-x-4 max-md:w-[90%] max-md:mx-auto my-3">
          <div>
            <label className="block text-gray-700 dark:text-neutral-200">Latitude</label>
            <input
              type="number"
              name="lat"
              value={hostel.lat}
              onChange={handleChange}
              className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-neutral-200">Longitude</label>
            <input
              type="number"
              name="lng"
              value={hostel.lng}
              onChange={handleChange}
              className="w-full p-2 border border-icons dark:bg-bgInputsDark dark:text-white rounded mt-1"
            />
          </div>
        </div>

<div className='flex flex-wrap justify-between items-center dark:text-text  '>
<div className='max-md:w-[90%] max-md:mx-auto my-3 '>
  <label className="block text-gray-700 dark:text-neutral-200">Mosque</label>
  <div className="flex space-x-4 ">
    <label>
      <input
        type="radio"
        name="mosque"
        value="available"
        checked={hostel.mosque === 'available'}
        onChange={handleChange}
        className="mr-2 "
      />
      Available
    </label>
    <label>
      <input
        type="radio"
        name="mosque"
        value="unavailable"
        checked={hostel.mosque === 'unavailable'}
        onChange={handleChange}
        className="mr-2"
      />
      Un-Available
    </label>
  </div>
</div>
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Ground</label>
  <div className="flex space-x-4">
    <label>
      <input
        type="radio"
        name="ground"
        value="available"
        checked={hostel.ground === 'available'}
        onChange={handleChange}
        className="mr-2"
      />
      Available
    </label>
    <label>
      <input
        type="radio"
        name="ground"
        value="unavailable"
        checked={hostel.ground === 'unavailable'}
        onChange={handleChange}
        className="mr-2"
      />
      Un-Available
    </label>
  </div>
</div>
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Mess</label>
  <div className="flex space-x-4">
    <label>
      <input
        type="radio"
        name="mess"
        value="available"
        checked={hostel.mess === 'available'}
        onChange={handleChange}
        className="mr-2"
      />
      Available
    </label>
    <label>
      <input
        type="radio"
        name="mess"
        value="unavailable"
        checked={hostel.mess === 'unavailable'}
        onChange={handleChange}
        className="mr-2"
      />
      Un-Available
    </label>
  </div>
</div>
<div className='max-md:w-[90%] max-md:mx-auto my-3'>
  <label className="block text-gray-700 dark:text-neutral-200">Canteen</label>
  <div className="flex space-x-4">
    <label>
      <input
        type="radio"
        name="canteen"
        value="available"
        checked={hostel.canteen === 'available'}
        onChange={handleChange}
        className="mr-2"
      />
      Available
    </label>
    <label>
      <input
        type="radio"
        name="canteen"
        value="unavailable"
        checked={hostel.canteen === 'unavailable'}
        onChange={handleChange}
        className="mr-2"
      />
      Un-Available
    </label>
  </div>
</div>

</div>

        <button
          type="submit"
          className="px-4 py-2 bg-hov hover:bg-hovDark text-text rounded flex items-center mx-auto"
          disabled={loading} // Disable button during submission
        >
          {loading ? <span className="spinner-border spinner-border-sm mr-2 text-gray-600 bg-gray-600" ></span> : null}
          Submit
        </button>
      </form>

      {/* Modal Popup */}
      {modalMessage && (
        <Modal onClose={() => setModalMessage('')}>
          <p>{modalMessage}</p>
        </Modal>
      )}
    </div>
  </div>
  );
};

export default RegisterHostel;





