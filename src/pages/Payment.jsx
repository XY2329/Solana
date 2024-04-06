// Payment.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Pay } from '../components'; // Import Pay component

const Payment = () => {
  const location = useLocation();
  const { state: eventData } = location;

  console.log(eventData);

  return (
    <div className="relative min-h-screen bg-gray-100 flex flex-col justify-between">
      
      {/* style bg image*/}
      <div className="absolute top-0 w-full h-[60vh] bg-cover bg-center " style={{ backgroundImage: `url(${eventData.img})`,  backgroundSize: 600, filter: 'blur(8px)' }}></div>
      
      <div className="pt-[60vh] container mx-auto px-4 pt-64 pb-15 mb-4">
        <Pay eventData={eventData} />
      </div>
    </div>
  );
};

export default Payment
