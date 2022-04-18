import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  APP_TRADEMARK,
  CURRENT_YEAR,
} from '../../app/common/constants/AppConstants';
import RegisterForm from './RegisterForm';
import SocialLogin from './SocialLogin';
import useDocTitle from '../../app/hooks/useDocTitle';

function RegisterPage() {
  const { t } = useTranslation();
  useDocTitle(t('navbar.navlinks.sign_up'));

  return (
    <div className='flex justify-center bg-white h-full p-4'>
      <div className='w-full md:max-w-lg mx-auto rounded-xs'>
        <div className='bg-white h-full'>
          <div className='text-3xl text-center text-main font-medium tracking-tighter py-6'>
            <Link to={'/'}>{APP_TRADEMARK}</Link>
          </div>
          <p className='text-center text-2xl mb-3'>{t('sign_up_page.title')}</p>
          <hr className='' />
          <div className='flex flex-col w-full px-8'>
            <SocialLogin />
            <div className='w-full flex items-center justify-between py-4'>
              <hr className='w-full bg-gray-600' />
              <p className='italic leading-4 px-2.5'>{t('sign_up_page.or')}</p>
              <hr className='w-full bg-gray-600' />
            </div>
            <RegisterForm />
            <div className='flex items-center justify-center mt-2'>
              <span className='text-center'>
                Hesap oluşturarak, <LinkStyle text='Gizlilik Politikası' />,{' '}
                <LinkStyle text='Kullanım Koşulları' /> ve{' '}
                <LinkStyle text='Çerez Politikası' /> kabul etmiş sayılırsınız
              </span>
            </div>
            <div className='relative flex items-center justify-center mt-8'>
              <span>{t('sign_up_page.already_have_account')}</span>
              <span className='text-main font-semibold ml-2'>
                {t('sign_up_page.sign_in')}
              </span>
            </div>
            <div className='flex items-center justify-center text-gray-500 font-medium my-10'>
              <span>©</span>
              <span className='ml-1'>{CURRENT_YEAR}</span>
              <span className='ml-1'>{APP_TRADEMARK}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LinkStyle = ({ text }) => {
  return <span className='text-main font-semibold ml-2'>{text}</span>;
};

export default RegisterPage;
