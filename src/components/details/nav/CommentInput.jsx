import React from "react";
import { IoSend } from "react-icons/io5";
import Comment from "../Comment";
import { deleteComment, fetchComments } from "../../../services/comments";

function CommentInput({
  handleAddComment,
  comment,
  setComment,
  comments,
  selectedHostel,
  setComments,
}) {
  const [showComments, setShowCommments] = React.useState(true);

  const handleDeleteComment = async (commentToDelete) => {
    if (selectedHostel) {
      await deleteComment(selectedHostel.id, commentToDelete);
      const fetchedComments = await fetchComments(selectedHostel.id);
      setComments(fetchedComments);
    }
  };

  const handleShowAllComments = () => {
    setShowCommments(!showComments);
  };
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>
      <form onSubmit={handleAddComment} className="mb-4 relative">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border bg-transparent border-gray-300 rounded mt-1 "
          placeholder="Share your review"
        />
        <button type="submit" className="  absolute right-2 top-2 text-3xl">
          <IoSend />
        </button>
      </form>
      <div
        className={` ${
          showComments ? "h-[50px]" : "h-auto"
        } overflow-hidden  z-10 `}
      >
        {comments.map((comment, index) => (
          <Comment
            key={index}
            comment={comment}
            onDelete={() => handleDeleteComment(comment)}
          />
        ))}
      </div>
      {comments.length > 1 && (
        <div
          className="text-end cursor-pointer mt-3"
          onClick={handleShowAllComments}
        >
          {showComments ? <p>show more</p> : <p>show less</p>}
        </div>
      )}
    </div>
  );
}

export default CommentInput;
