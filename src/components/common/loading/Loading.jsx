import React from 'react';
import './loading.css'; // Import the CSS for 3D animations

const LoadingScreen = () => {
  return (
    <div className="loading-container ">
      <div className="cube">
        <div className="face front">O</div>
        <div className="face back">H</div>
        <div className="face left">R</div>
        <div className="face right">R</div>
        <div className="face top">S</div>
        {/* <div className="face bottom"></div> */}
      </div>
    </div>
  );
};

export default LoadingScreen;
