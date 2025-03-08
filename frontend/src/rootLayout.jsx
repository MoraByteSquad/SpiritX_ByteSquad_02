//selected count 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import React from 'react';

const RootLayout = ({ children }) => {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <header>
        <Navbar />  
      </header>
      <main className='flex-1 bg-green-100 '>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default RootLayout;