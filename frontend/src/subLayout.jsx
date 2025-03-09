//selected count 

import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar'
import React from 'react';

const SubLayout = () => {
  return (
    <div className='flex justify-between '>
      <aside>
        <Sidebar />  
      </aside>
      <main className='flex-1 h-screen z-15'>
        <Outlet />
      </main>
      
    </div>
  );
};

export default SubLayout;