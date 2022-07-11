import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { DEFAULT_USER_AVATAR_URL } from '../../app/common/constants/urlConstants';
import { authActions } from '../auth/authReducer';
import { signOutFirebase } from '../../app/firebase/firebaseService';

function ProfileMenu({ currentUserProfile }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlerSignOut() {
    await signOutFirebase();
    dispatch(authActions.signOutUser());
    toast.success(t('profile_menu.sign_out_success'));
    navigate('/');
  }

  return (
    <Menu as='div' className='relative inline-block text-left h-8 w-8'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full border-gray-300 shadow-sm  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'>
          <img
            src={currentUserProfile?.photoURL || DEFAULT_USER_AVATAR_URL}
            className='h-8 w-8 rounded-full object-cover hover:cursor-pointer'
            referrerPolicy='no-referrer'
            alt='user-image'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <MenuItem
              text={t('profile_menu.profile')}
              onClick={() => navigate(`/profiles/${currentUserProfile?.uid}`)}
            />
            <MenuItem text={t('profile_menu.settings')} />
            <MenuItem
              text={t('profile_menu.sign_out')}
              onClick={handlerSignOut}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const MenuItem = ({ text, ...props }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          {...props}
          className={classNames(
            active ? 'bg-gray-100 text-main' : 'text-gray-700',
            'block w-full text-left px-4 py-2 text-sm'
          )}
        >
          {text}
        </button>
      )}
    </Menu.Item>
  );
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

ProfileMenu.propTypes = {
  currentUserProfile: PropTypes.object,
};

MenuItem.propTypes = {
  text: PropTypes.string,
};

export default ProfileMenu;
