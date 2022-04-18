import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';

import { authActions } from '../auth/authReducer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ProfileMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Menu as='div' className='relative inline-block text-left h-8 w-8'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full border-gray-300 shadow-sm  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none'>
          <img
            src='/assets/img/user.png'
            className='h-8 w-8 rounded-full object-cover hover:cursor-pointer'
            alt='user'
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
            <MenuItem text={t('profile_menu.profile')} />
            <MenuItem text={t('profile_menu.settings')} />
            <MenuItem
              text={t('profile_menu.sign_out')}
              onClick={() => dispatch(authActions.logout())}
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

export default ProfileMenu;
