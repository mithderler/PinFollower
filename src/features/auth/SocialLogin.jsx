import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FaFacebookF } from 'react-icons/fa';

function SocialLogin() {
  return (
    <div className='mt-8'>
      <button className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-md bg-google border-gray-300  flex items-center w-full h-11 mb-3'>
        <FaGoogle className='text-white' />
        <p className='w-4/5 text-center text-white ml-4'>
          Google ile Giriş Yap
        </p>
      </button>
      <button className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-md bg-facebook border-gray-300  flex items-center w-full h-11 mb-3'>
        <FaFacebookF className='text-white' />

        <p className='w-4/5 text-center text-white ml-4'>
          Facebook ile Giriş Yap
        </p>
      </button>
    </div>
  );
}

export default SocialLogin;
