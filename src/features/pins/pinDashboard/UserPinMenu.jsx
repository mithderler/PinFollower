import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';

import { deletePinInFirestore } from '../../../app/firebase/firestoreService';
import { pinActions } from '../pinReducer';
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function UserPinMenu({ pin }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handlerDeletePin() {
    deletePinInFirestore(pin.id);
    dispatch(pinActions.deletePin(pin.id));
  }

  return (
    <Menu as='div' className='relative inline-block text-left h-8 w-8'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full focus:outline-none'>
          <BsThreeDots />
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
        <Menu.Items className='origin-top-right absolute right-7 top-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            <MenuItem
              text={t('pin.user_menu.edit')}
              onClick={() => navigate(`/pins/${pin.id}/edit`)}
            />
            <MenuItem
              text={t('pin.user_menu.delete')}
              onClick={handlerDeletePin}
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

export default UserPinMenu;
