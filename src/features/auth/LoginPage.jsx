import React from 'react';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';

function LoginPage() {
  return (
    <div className='w-full md:max-w-lg mx-auto py-3 rounded-xs'>
      <div className='bg-white h-full'>
        <div className='text-3xl text-center text-main font-medium tracking-tighter p-5'>
          PinFollower
        </div>
        <hr className='' />
        <div className='flex flex-col w-full px-8'>
          <SocialLogin />
          <div className='w-full flex items-center justify-between py-4'>
            <hr className='w-full bg-gray-600' />
            <p className='italic leading-4 px-2.5'>Veya</p>
            <hr className='w-full bg-gray-600' />
          </div>
          <LoginForm />
          <div className='flex items-center justify-center mt-2'>
            <span>Hesabınız yok mu?</span>
            <span className='text-main font-semibold ml-2'>Kayıt Ol</span>
          </div>
          <div className='flex items-center justify-center mt-3'>
            <span>Onaylama talimatları almadınız mı?</span>
            <span className='text-main font-semibold ml-2'>Yeniden gönder</span>
          </div>
          <div className='flex items-center justify-center text-gray-500 font-medium my-10'>
            <span>©</span>
            <span className='ml-1'>2022</span>
            <span className='ml-1'>PinFollower</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
