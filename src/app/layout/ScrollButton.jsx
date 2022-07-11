import { useState, useEffect } from 'react';
import { BiArrowFromBottom } from 'react-icons/bi';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
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

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className='fixed bottom-6 right-6'>
      <button
        type='button'
        onClick={scrollToTop}
        className={classNames(
          visible ? 'opacity-100' : 'opacity-0',
          'bg-gray-600 hover:bg-main focus:ring-transparent inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2'
        )}
      >
        <BiArrowFromBottom className='h-6 w-6' aria-hidden='true' />
      </button>
    </div>
  );
};

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default ScrollButton;
