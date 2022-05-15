import React from 'react';
import Footer from '../../features/footer/Footer';
import Navbar from '../../features/nav/Navbar';
import ScrollButton from './ScrollButton';

function SignedInUserLayout({ containerWidth = 'max-w-3xl', children }) {
  return (
    <div className='bg-[#f8f8f8]'>
      <Navbar />
      <div className={`container ${containerWidth} px-4 pt-24`}>
        {children}
        <ScrollButton />
      </div>
      <Footer />
    </div>
  );
}

export default SignedInUserLayout;