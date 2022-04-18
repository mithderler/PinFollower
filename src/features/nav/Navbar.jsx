import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscSearch } from 'react-icons/vsc';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import SignedOutMenu from './SignedOutMenu';
import { useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';

function Navbar() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    Cookies.set('i18next', language, { expires: 7 });
  };
  return (
    <div className='fixed h-[60px] w-full flex items-center bg-white'>
      <div className=' sm:container sm:mx-auto w-full  px-4 md:max-w-[1100px] flex justify-between items-center '>
        <div className='h-9 text-3xl text-main tracking-tighter mr-4'>
          PinFollower
        </div>

        <div className='h-11 w-96 min-w-[250px] p-2 relative border text-gray-500 rounded-sm '>
          <input
            type='text'
            id='search'
            className='h-full w-full focus:shadow focus:outline-none'
            placeholder={t('navbar.search')}
          />
          <button>
            <VscSearch className='text-md absolute right-4 top-3' />
          </button>
        </div>
        <div className='flex ml-4'>
          <GiHamburgerMenu className='text-3xl  cursor-pointer md:hidden' />
          {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
          <ul className='ml-7 flex items-center gap-1'>
            <button onClick={() => changeLanguage('en')}>EN</button>{' '}
            <button onClick={() => changeLanguage('tr')}>TR</button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
