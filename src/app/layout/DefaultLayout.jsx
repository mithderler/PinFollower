import PropTypes from 'prop-types';

import Footer from '../../features/footer/Footer';
import Navbar from '../../features/nav/Navbar';
import ScrollButton from './ScrollButton';

function DefaultLayout({
  containerWidth = 'max-w-3xl',
  marginTop = 'mt-8 sm:mt-4',
  title = null,
  bgColor = 'bg-white',
  children,
}) {
  return (
    <div className='bg-background min-h-screen flex flex-col'>
      <Navbar />
      <div
        className={`flex-1 container ${containerWidth} pt-20 sm:pt-12 pb-10 px-3`}
      >
        {title && (
          <h2 className='pt-12 sm:pt-12 sm:pb-4 font-semibold text-2xl'>
            {title}
          </h2>
        )}
        <div className={`p-6 sm:p-10 ${marginTop} rounded-lg ${bgColor}`}>
          {children}
          <ScrollButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}

DefaultLayout.propTypes = {
  containerWidth: PropTypes.string,
  marginTop: PropTypes.string,
  title: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.object.isRequired,
};

export default DefaultLayout;
