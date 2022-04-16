import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { VscSearch } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';

function Navlink({ name, link = '' }) {
  return (
    <li className='cursor-pointer transition ease-in delay-100 hover:text-main'>
      <Link to={link}>{name}</Link>
    </li>
  );
}

function Navbar() {
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
        <div className='ml-4'>
          <GiHamburgerMenu className='text-3xl  cursor-pointer md:hidden' />
          <ul className='hidden md:flex md:justify-between md:items-center gap-3'>
            <Navlink name={t('navbar.navlinks.explore')} link='' />
            <Navlink
              name={t('navbar.navlinks.sign_in')}
              link='/users/sign_in'
            />
            <Navlink name={t('navbar.navlinks.sign_up')} />
            <button onClick={() => changeLanguage('en')}>EN</button>{' '}
            <button onClick={() => changeLanguage('tr')}>TR</button>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
