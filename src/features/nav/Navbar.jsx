import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { VscSearch } from 'react-icons/vsc';

import HamburgerMenu from './HamburgerMenu';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function Navbar() {
  const { authenticated } = useSelector((state) => state.auth);
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <div className='fixed h-[60px] w-full flex items-center bg-white'>
      <div className=' sm:container sm:mx-auto w-full  px-4 md:max-w-[1100px] flex justify-between items-center '>
        <div className='h-9 text-3xl text-main tracking-tighter mr-4'>
          <Link to='/'>PinFollower</Link>
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

        <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

        {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
      </div>
    </div>
  );
}

export default Navbar;
