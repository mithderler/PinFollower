import React from 'react';
import { useTranslation } from 'react-i18next';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';

import {
  APP_TRADEMARK,
  CONTACT_EMAIL,
  CURRENT_YEAR,
} from '../../app/common/constants/AppConstants';
import LanguageMenu from './LanguageMenu';
import { Link } from 'react-router-dom';

function Footer() {
  const { t } = useTranslation();

  return (
    <div className='w-full  p-10 bg-footer text-white '>
      <div className='max-w-6xl mx-auto'>
        <div className='block md:flex justify-between mb-8'>
          <div>
            <p className='text-3xl my-2 md:my-4 font-semibold'>
              {APP_TRADEMARK}
            </p>
            <Link to='/about'>
              <p>{t('footer.about')}</p>
            </Link>
          </div>
          <div className='pt-4 md:pt-0'>
            <h4 className='text-lg font-semibold my-4 md:my-8'>
              {t('footer.follow_us')}
            </h4>
            <div className='flex space-x-3 mt-3'>
              <span>
                <BsTwitter />
              </span>
              <span>
                <BsInstagram />
              </span>
            </div>
          </div>
          <div className='pt-4 md:pt-0'>
            <h4 className='text-lg font-semibold my-4 md:my-8'>
              {t('footer.contact_with_us')}
            </h4>
            <div className='flex items-center space-x-3'>
              <span>
                <AiOutlineMail />
              </span>
              <span>{CONTACT_EMAIL}</span>
            </div>
          </div>
        </div>
        <hr className='w-full my-2 border-gray-700' />
        <div className='block md:flex justify-between pt-4 text-gray-400'>
          <div className='mb-6 md:mb-0'>
            <LanguageMenu />
          </div>
          <div className='space-x-2 text-center md:text-inherit'>
            <Link to='/terms_of_use'>
              <span>{t('footer.terms_of_use')}</span>
            </Link>
            <span className='mx-2'>|</span>
            <Link to='/privacy_policy'>
              <span>{t('footer.privacy_policy')}</span>
            </Link>
            <span className='mx-2'>|</span>
            <span>{`© ${CURRENT_YEAR} ${APP_TRADEMARK}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
