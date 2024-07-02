import React from 'react'
import Navbar from './Navbar';
const Layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="main-content md:ml-[260px] w-[100%] h-full mt-2">
          <p className='font-bold text-4xl ml-4 '>Sticky Notes</p>
          <span className='border-b-2 border-gray-500 inline-block w-full'></span>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;