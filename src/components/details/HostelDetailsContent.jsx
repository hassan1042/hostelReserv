import React from "react";
import Comment from "./Comment";
import { FaBath, FaBed, FaMosque } from "react-icons/fa";
import DynamicMap from "./Map";
import { CiWifiOn } from "react-icons/ci";
import { IoFastFood } from "react-icons/io5";
import { MdStadium } from "react-icons/md";
import AddToFavorites from "../dashboard/favorites/AddFavorites";

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

      <div className="flex flex-col justify-center mx-auto text-center   my-5 italic text-xl">
        <p className=" font-bold text-xl lg:text-2xl my-3">
          {" "}
          Hostel Description
        </p>
        <p className=" font-semibold"> {selectedHostel.description}</p>
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

        <div className=" border-y-neutral-300 border-y-[1px] py-5 text-xl  max-lg:space-y-5 max-lg:mx-auto max-lg:my-3 ">
          <p className="text-2xl font-bold justify-start mb-5 ">Amenities</p>
          <div className="flex justify-between items-center flex-wrap" >
            <p className="flex justify-start items-center space-x-4 w-[28%] lg:w-[12%]  mb-3 ">
              <FaBed /> <span>{selectedHostel.beds}</span>
            </p>
         
            <p className="flex justify-start items-center space-x-4 w-[28%]  lg:w-[12%] mb-3">
              {" "}
              <FaBath /> <span>{selectedHostel.bathroom}</span>
            </p>
            <p className="flex justify-start items-center space-x-4 w-[28%] lg:w-[12%] mb-3">
              {" "}
              <CiWifiOn /> <span>{selectedHostel.wifi === 'available' ? 'Yes' : 'No'}</span>
            </p>
            <p className="flex justify-start items-center space-x-4 w-[28%] lg:w-[12%] mb-3">
              {" "}
              <FaMosque /><span>{selectedHostel.mosque === 'available' ? 'Yes' : 'No'}</span>
            </p>
            <p className="flex justify-start items-center space-x-4 w-[28%] lg:w-[12%] mb-3">
              {" "}
              <IoFastFood /><span>{selectedHostel.canteen === 'available' ? 'Yes' : 'No'}</span>
            </p>
            <p className="flex justify-start items-center space-x-4 w-[28%] lg:w-[12%] mb-3 ">
              {" "}
              <MdStadium /><span>{selectedHostel.ground === 'available' ? 'Yes' : 'No'}</span>
            </p>
          
          </div>
      
      </div>
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
