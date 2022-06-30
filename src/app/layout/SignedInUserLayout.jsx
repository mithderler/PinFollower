import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../../features/footer/Footer';
import Navbar from '../../features/nav/Navbar';
import ScrollButton from './ScrollButton';

function SignedInUserLayout({ containerWidth = 'max-w-3xl', children }) {
  return (
    <div className='bg-background'>
      <Navbar />
      <div className={`container ${containerWidth} px-4 pt-28 sm:pt-24`}>
        {children}
        <ScrollButton />
      </div>
      <Footer />
    </div>
  );
}

SignedInUserLayout.propTypes = {
  containerWidth: PropTypes.string,
};

export default SignedInUserLayout;
