import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ButtonMain from '../../app/common/buttons/ButtonMain';
import ProfileMenu from './ProfileMenu';

function SignedInMenu({ currentUserProfile }) {
  const { t } = useTranslation();

  return (
    <>
      <ul className='hidden md:flex md:justify-between md:items-center gap-3 ml-3'>
        <ButtonMain className='min-w-[130px]'>
          <Link to='/pins/new'>{t('navbar.create_pin')}</Link>
        </ButtonMain>
        <Navlink name={t('navbar.navlinks.home')} link='/' />
        <Navlink name={t('navbar.navlinks.explore')} link='' />
        <ProfileMenu currentUserProfile={currentUserProfile} />
      </ul>
    </>
  );
}

function Navlink({ name, link = '' }) {
  return (
    <li className='cursor-pointer transition ease-in delay-100 hover:text-main'>
      <Link to={link}>{name}</Link>
    </li>
  );
}

export default SignedInMenu;
