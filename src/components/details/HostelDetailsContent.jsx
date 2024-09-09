import React from "react";
import Comment from "./Comment";
import DynamicMap from "./Map";
import AddToFavorites from "../dashboard/favorites/AddFavorites";
import Amenities from "./Amenities";



const HostelDetailsContent = ({
  selectedHostel,
  comment,
  setComment,
  handleAddComment,
  comments,
  handleDeleteComment,
}) => {
  return (
    <div className="  py-10 text-white p-6   shadow-lg">
      <div className="text-xl md:text-2xl lg:text-2xl font-bold flex justify-around items-center">
        <p className=" ">
          {selectedHostel.name} at {selectedHostel.location} 
        </p>
            <AddToFavorites id={selectedHostel.id}/>
      </div>

     <div className="flex justify-evenly items-center flex-wrap">
     <div className="flex flex-col justify-center    my-5 italic text-xl">
        <p className=" font-bold text-xl lg:text-2xl my-3 text-center" >
          {" "}
          Hostel Description
        </p>
        <p className=" font-semibold"> {selectedHostel.description}</p>

      </div>
      <a href={selectedHostel.video} rel="noopener noreferrer" className='text-xl text-white italic'  >Watch a video</a>
     </div>

{/** booking and instructions */}
    <div className="flex flex-wrap justify-between items-center my-5">
    <div className="flex flex-col justify-center mx-auto text-center   my-5 italic text-xl">
        <p className=" font-bold text-xl lg:text-2xl my-3">
          {" "}
          Booking Information
        </p>
        <p className=" font-semibold"> {selectedHostel.booking}</p>
        
      </div>
      <div className="flex flex-col justify-center mx-auto text-center   my-5 italic text-xl lg:w-[40%]">
          <p className=" font-bold text-xl lg:text-2xl my-3">
            {" "}
            Special Instructions
          </p>
          <p className=" font-semibold text-red-400">
            {" "}
            {selectedHostel.instruction}
          </p>
        </div>
    </div>

         
      
    <Amenities/>
      {/* <div className="my-10">
        <DynamicMap lat={selectedHostel.lat} lng={selectedHostel.lng} />
      </div> */}
      {/** Comments */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <div className="mb-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border bg-transparent border-gray-300 rounded mt-1"
            placeholder="Share your review"
          />
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-hov hover:bg-hovDark text-text  rounded mt-2"
          >
            Add Review
          </button>
        </div>
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            onDelete={() => handleDeleteComment(comment)}
          />
        ))}
      </div>
    </div>
  );
};

export default HostelDetailsContent;
