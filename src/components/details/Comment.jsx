// src/components/Comment.jsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';

const Comment = ({ comment, onDelete }) => {
  return (
    <div className="flex items-center justify-between bg-transparent p-3 rounded mt-2">
      <p>{comment.text}</p>
      {comment.isAuthor && (
        <button onClick={() => onDelete(comment)} className="text-red-500">
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default Comment;
