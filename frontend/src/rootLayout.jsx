//selected count 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import React from 'react';
import SignupImage from './assets/signup.jpg'; 
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className='flex flex-col justify-between min-h-screen relative '>
      {/* Background Image */}
            <div className="absolute inset-0 ">
              <img
                src={SignupImage}  // Path relative to the public folder
                alt="Signup Background"
                className="w-full h-full object-cover brightness-75 blur-xs"
              />
            </div>
      
      <header className='z-20'>
        <Navbar />  
      </header>
      <main className='flex-1  z-10'>
        <Outlet />
      </main>
      <footer className='z-20'>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;