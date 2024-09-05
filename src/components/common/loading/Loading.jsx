import React from 'react';
import './loading.css'; // Import the CSS for 3D animations

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="cube">
        <div className="face front">H</div>
        <div className="face back">O</div>
        <div className="face left">S</div>
        <div className="face right">T</div>
        <div className="face top">E</div>
        <div className="face bottom">L</div>
      </div>
    </div>
  );
};

export default LoadingScreen;
