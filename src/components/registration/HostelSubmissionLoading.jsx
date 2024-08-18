import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gray-300">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid mx-auto"></div>
        <h2 className="text-2xl font-bold mt-4">Uploading...</h2>
        <p className="text-gray-500 mt-2">Please wait while your hostel is being added...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
