import React from 'react';
import GoogleMapReact from 'google-map-react';

// Example marker component
const Marker = ({ text }) => <div>{text}</div>;

const DynamicMap = ({ lat, lng }) => {
  // Set up the default zoom level
  const defaultZoom = 11;

  return (
    // Make sure the container has a defined height and width
    <div style={{ height: '60vh', width: '100%' }}>
  
    </div>
  );
};

export default DynamicMap;
