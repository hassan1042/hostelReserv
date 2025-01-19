import React from "react";
import { deleteHostel } from "../../../services/deleteHostel";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

function DeleteHostel({ selectedHostel, showDialogBox, showDialog }) {
  const navigate = useNavigate();

  const handleDeleteHostel = async () => {
    if (selectedHostel) {
      await deleteHostel(selectedHostel.id);
      navigate("/");
    }
  };
  return (
    <div className="flex items-center relative">
      <button
        onClick={showDialogBox}
        className="px-4 py-2 bg-red-500 hover:bg-hovDark text-white rounded flex justify-between items-center space-x-2"
      >
        <FaTrash /> <span>Hostelsss</span>
      </button>

      <div
        className={`${
          showDialog ? "fixed" : "hidden"
        } top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50`}
      >
        <div className="w-80 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Are you sure you want to delete the hostel?
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            This action cannot be undone.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              title="yes"
              onClick={handleDeleteHostel}
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Yes
            </button>
            <button
              title="no"
              onClick={showDialogBox}
              className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteHostel;
