import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VscSearch } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import HamburgerMenu from './HamburgerMenu';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import { APP_TRADEMARK } from '../../app/common/constants/AppConstants';

function Navbar() {
  const { authenticated } = useSelector((state) => state.auth);
  const { currentUserProfile } = useSelector((state) => state.profile);
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <div className='fixed h-[88px] sm:h-[60px] w-full flex items-center bg-white z-10'>
      <div className=' sm:container sm:mx-auto w-full  px-4 md:max-w-[1100px] block sm:flex sm:justify-between sm:items-center '>
        <div className='h-full block xs:flex text-xl sm:text-2xl md:text-3xl text-main tracking-tighter text-center mt-3 sm:mt-0 sm:mr-4'>
          <Link to='/'>{APP_TRADEMARK}</Link>
        </div>
        <div className='w-full flex justify-between items-center px-2 py-2 sm:p-0'>
          <div className='h-11 max-w-2xl w-full p-2 relative border text-gray-500 rounded-sm'>
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

          <HamburgerMenu
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            currentUserProfile={currentUserProfile}
          />

          {authenticated ? (
            <SignedInMenu currentUserProfile={currentUserProfile} />
          ) : (
            <SignedOutMenu />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
