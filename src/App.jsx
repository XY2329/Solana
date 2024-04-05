import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './components';

import { Home, Payment, Portfolio } from './pages';


const App = () => {
  return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
        </main>
        <Footer />
      </div>
  )
}

export default App