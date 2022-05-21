import React from 'react';
import Footer from '../../features/footer/Footer';
import Navbar from '../../features/nav/Navbar';
import ScrollButton from './ScrollButton';

function DocumentLayout({
  containerWidth = 'max-w-3xl',
  title = '',
  children,
}) {
  return (
    <div className='bg-background'>
      <Navbar />
      <div
        className={`container ${containerWidth} py-10 sm:py-4 sm:pb-10 px-3`}
      >
        <h2 className='mt-24 sm:mt-16 sm:py-5 font-semibold text-2xl'>
          {title}
        </h2>
        <div className={`p-6 sm:p-10 mt-8 sm:mt-4 bg-white rounded-lg`}>
          {children}
          <ScrollButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DocumentLayout;
