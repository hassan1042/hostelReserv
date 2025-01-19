import React from "react";
// import DynamicMap from "./Map";
import Amenities from "./Amenities";
import CommentInput from "./nav/CommentInput";
import InitialInfo from "./InitialInfo";

const HostelDetailsContent = ({
  selectedHostel,
  comment,
  setComment,
  handleAddComment,
  comments,
  setComments,
}) => {
  return (
    <div className="  py-10 text-white p-6   shadow-lg">
      <InitialInfo selectedHostel={selectedHostel} />

      <Amenities hostel={selectedHostel} />
      {/* <div className="my-10">
        <DynamicMap lat={selectedHostel.lat} lng={selectedHostel.lng} />
      </div> */}
      {/** Comments */}
      <CommentInput
        setComments={setComments}
        selectedHostel={selectedHostel}
        handleAddComment={handleAddComment}
        comment={comment}
        setComment={setComment}
        comments={comments}
      />
    </div>
  );
};

export default HostelDetailsContent;
