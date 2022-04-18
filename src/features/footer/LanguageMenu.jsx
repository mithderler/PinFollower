import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { MdOutlineLanguage } from 'react-icons/md';
import Cookies from 'js-cookie';

import { uiActions } from '../../app/common/reducers/uiReducer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function LanguageMenu() {
  const { appLanguage } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { i18n } = useTranslation();

  const changeLanguage = (language, title) => {
    i18n.changeLanguage(language);
    Cookies.set('i18next', language, { expires: 7 });
    dispatch(uiActions.changeLanguage(language));
  };

  const getFullName = (lng) => {
    if (lng === 'tr') return 'Türkçe';
    if (lng === 'en') return 'English';
    return '';
  };

  return (
    <Menu as='div' className='relative inline-block text-left h-8 w-8'>
      <div>
        <Menu.Button className='flex items-center bg-gray-800 p-2 rounded-md focus:outline-none hover:bg-gray-600'>
          <span className='mr-2'>{getFullName(appLanguage)}</span>
          <MdOutlineLanguage className='text-2xl bg-inherit' />
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
        <Menu.Items className='origin-top-right absolute left-0 bottom-10 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <MenuItem
              text='Türkçe'
              onClick={() => changeLanguage('tr', 'Türkçe')}
            />
            <MenuItem
              text='English'
              onClick={() => changeLanguage('en', 'English')}
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

export default LanguageMenu;
