import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

import { authActions } from '../auth/authReducer';

function HamburgerMenu({ openMenu, setOpenMenu }) {
  const { authenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div
      className='flex ml-4 text-3xl  md:hidden cursor-pointer transition ease-in delay-300'
      onClick={() => setOpenMenu(!openMenu)}
    >
      {openMenu ? <GrClose /> : <GiHamburgerMenu />}

      <div
        className={
          openMenu
            ? 'h-screen absolute top-0 right-0 bottom-0 left-0 cursor-default z-10'
            : 'hidden'
        }
        onClick={() => setOpenMenu(!openMenu)}
      >
        <div
          className={
            openMenu
              ? 'block text-center py-4 absolute top-16 right-0 left-0 bg-white z-20'
              : 'hidden'
          }
        >
          {!authenticated && (
            <ul>
              <MenuElement text={t('navbar.navlinks.explore')} />
              <MenuElement
                text={t('navbar.navlinks.sign_in')}
                onClick={() => dispatch(authActions.login())}
              />
              <MenuElement text={t('navbar.navlinks.sign_up')} />
            </ul>
          )}
          {authenticated && (
            <ul>
              <li className='flex justify-center items-center cursor-default pb-3'>
                <img
                  src='/assets/img/user.png'
                  className='h-8 w-8 rounded-full object-cover'
                  alt='user'
                />
              </li>
              <MenuElement
                text={t('navbar.create_pin')}
                className='bg-main !text-white mx-4 rounded hover:!bg-second transition ease-in delay-100'
                onClick={() => alert('oo yeeaa')}
              />
              <MenuElement text={t('navbar.navlinks.home')} />
              <MenuElement text={t('navbar.navlinks.explore')} />
              <MenuElement text={t('profile_menu.profile')} />
              <MenuElement text={t('profile_menu.settings')} />
              <MenuElement
                text={t('profile_menu.sign_out')}
                onClick={() => dispatch(authActions.logout())}
              />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const MenuElement = ({ text, className, ...props }) => {
  return (
    <li
      className={`py-2 text-lg cursor-pointer hover:text-main hover:bg-gray-50 focus:outline-none ${className}`}
      {...props}
    >
      {text}
    </li>
  );
};

export default HamburgerMenu;
