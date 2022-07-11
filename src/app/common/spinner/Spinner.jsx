import React from 'react';

import LoadingIcon from './loading.svg';

function Spinner() {
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <img src={LoadingIcon} alt='loading-icon' />
    </div>
  );
}

export default Spinner;
