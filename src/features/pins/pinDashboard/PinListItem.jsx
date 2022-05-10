import React from 'react';
import { GoLocation } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';

function PinListItem() {
  return (
    <div className='bg-white rounded-xl pb-4 px-4 mb-10'>
      <div className='h-14 flex items-center'>
        <img
          src='/assets/img/mith.jpg'
          className='h-10 w-10 rounded-full mr-2'
          alt='user'
        />
        <div className='block m-2'>
          <span className='text-lg text-black'>mithderler</span>
          <div className='text-xs'>2 ay önce</div>
        </div>
      </div>

      <div className=''>
        <div className='flex items-center'>
          <GoLocation />
          <span> Ihlara/Güzelyurt/Aksaray, Türkiye</span>
        </div>
        <img
          className='w-full h-80 mt-4 object-cover rounded-xl'
          src='/assets/img/florya.jpg'
          alt='pin_image'
        />
        <div className='py-4'>
          <span>#gaziantephayvanatbahçesi #safari #park #gaziantep</span>
          <h3 className='text-3xl py-3 font-semibold text-black'>
            Gaziantep Hayvanat Bahçesi
          </h3>
          <p>Çok güzel bir safari alanı, gidip görmenizi tavsiye ederim</p>
        </div>
      </div>

      <div className='flex items-center pt-4'>
        <div className='w-8 h-8 bg-gray-200 flex items-center justify-center mr-2 rounded-sm'>
          <AiOutlineHeart />
        </div>
        <span>2</span>
      </div>
    </div>
  );
}

export default PinListItem;
