import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';

import { Home, Payment } from './pages';


const App = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment/:id" element={<Payment />} />
        </Routes>
        </main>
        <Footer />
      </div>
  )
}

export default App