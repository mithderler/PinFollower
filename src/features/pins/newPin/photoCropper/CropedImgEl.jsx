import React from 'react';

function CropedImgEl({ src }) {
  return (
    <div className='relative w-40 h-30 mr-3 z-10'>
      <div className='absolute'>
        <span className='text-gray-700 bg-white opacity-50 p-1'>
          Cropped image
        </span>
      </div>
      <div className=''>
        <img src={src} alt='Cropped' />
      </div>
    </div>
  );
}

export default CropedImgEl;
