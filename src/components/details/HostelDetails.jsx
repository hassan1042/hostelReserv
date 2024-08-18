import React, { useState, useEffect } from 'react';
import { useHostel } from '../../contexts/HostelContext';
import Comment from './Comment';
import { addComment, deleteComment, fetchComments } from '../../services/comments';
import { ClipLoader } from 'react-spinners';
import Navbar from './HostelNav';
import ImageSlider from './HostelSlider';
import HostelDetailsContent from './HostelDetailsContent';


const HostelDetails = () => {
  const { selectedHostel } = useHostel();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const getComments = async () => {
      if (selectedHostel) {
        const fetchedComments = await fetchComments(selectedHostel.id);
        setComments(fetchedComments);
        setLoading(false);
      }
    };

    getComments();
  }, [selectedHostel]);

  const handleAddComment = async () => {
    if (selectedHostel) {
      const newComment = { text: comment, isAuthor: true };
      await addComment(selectedHostel.id, newComment);
      setComment('');
      const fetchedComments = await fetchComments(selectedHostel.id);
      setComments(fetchedComments);
    }
  };

  const handleDeleteComment = async (commentToDelete) => {
    if (selectedHostel) {
      await deleteComment(selectedHostel.id, commentToDelete);
      const fetchedComments = await fetchComments(selectedHostel.id);
      setComments(fetchedComments);
    }
  };

 

  if (!selectedHostel) return <p>No hostel selected</p>;

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="relative h-auto">
          {selectedHostel.video && (
            <video
              autoPlay
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={selectedHostel.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="relative z-10 bg-opacity-75  bg-black">
            <Navbar 
              name={selectedHostel.name} 
              location={selectedHostel.location} 
              contact={selectedHostel.contact} 
            />
            {selectedHostel.images && selectedHostel.images.length > 1 ? (
              <ImageSlider images={selectedHostel.images} />
            ) : (
              selectedHostel.images && <img
                src={selectedHostel.images[0]}
                alt={selectedHostel.name}
                className="w-full md:w-[90%] mx-auto h-96 object-cover"
              />
            )}
            <HostelDetailsContent 
              selectedHostel={selectedHostel} 
              comment={comment} 
              setComment={setComment} 
              handleAddComment={handleAddComment} 
              comments={comments} 
              handleDeleteComment={handleDeleteComment}
            />               
          </div>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      )}
    </>
  );
};

export default HostelDetails;
