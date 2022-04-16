import React, { useState } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVisible);

  return (
    <button>
      <BsFillArrowUpCircleFill
        onClick={scrollToTop}
        style={{ display: visible ? 'inline' : 'none' }}
        className='fixed  z-10 right-6 bottom-6 text-[50px] transition ease-out delay-100 text-gray-600 hover:text-main'
      />
    </button>
  );
};

export default ScrollButton;
