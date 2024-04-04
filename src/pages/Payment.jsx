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
      <div className="absolute top-0 w-full h-1/2 bg-cover bg-center " style={{ backgroundImage: `url(${eventData.img})`,  backgroundSize: 600,  }}></div>
      
      <div className="pt-[100vh] container mx-auto px-4 pt-64 pb-16">
        <Pay eventData={eventData} />
      </div>
    </div>
  );
};

export default Payment
