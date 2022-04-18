import React from 'react';
import ScrollButton from '../../../app/layout/ScrollButton';
import Navbar from '../../nav/Navbar';
import PinList from './PinList';

function PinDashboard() {
  return (
    <div className='bg-[#f8f8f8]'>
      <Navbar />
      <div className='container mx-auto max-w-[600px] px-4 pt-24'>
        <PinList />
        <ScrollButton />
      </div>
    </div>
  );
}

export default PinDashboard;
