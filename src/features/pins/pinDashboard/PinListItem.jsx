import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoLocation } from 'react-icons/go';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { formatDistance } from 'date-fns';
import * as locale from 'date-fns/locale';
import { Link } from 'react-router-dom';

import ReadOnly from '../../../app/common/utils/SlateEditor/ReadOnly';
import {
  addUserLike,
  cancelUserLike,
} from '../../../app/firebase/firestoreService';
import { useSelector } from 'react-redux';
import UserPinMenu from './UserPinMenu';

function PinListItem({ pin }) {
  const { authenticated, currentUser } = useSelector((state) => state.auth);
  const [localeLang, setLocaleLang] = useState(null);
  const [isLiked, setIsLiked] = useState(
    pin.likeIds?.some((id) => id === currentUser?.uid)
  );
  const [likeCount, setLikeCount] = useState(pin?.likeCount);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === 'en') {
      setLocaleLang('enUS');
    } else {
      setLocaleLang(i18n.language);
    }
  }, [i18n.language]);

  async function addLikeToDb() {
    if (!authenticated) return;
    setIsLiked(true);
    setLikeCount((prev) => prev + 1);
    await addUserLike(pin.id);
  }

  async function removeLikeFromDb() {
    if (!authenticated) return;
    setIsLiked(false);
    setLikeCount((prev) => prev - 1);
    await cancelUserLike(pin.id);
  }

  return (
    <div className='bg-white rounded-xl py-4 px-4 mb-10'>
      <div className='flex justify-between items-center'>
        <div className='h-14 flex items-center'>
          <img
            src={pin.ownerPhotoURL || '/assets/img/user.png'}
            className='h-10 w-10 rounded-full mr-2'
            alt='user'
          />
          <div className='block m-2'>
            <span className='text-lg text-black'>
              <Link
                to={`/profiles/${pin.ownerUid}`}
                className='cursor-pointer transition ease-in delay-100 hover:text-main'
              >
                {pin.ownerUsername}
              </Link>
            </span>
            <div className='text-xs'>
              {formatDistance(
                new Date(pin.createdAt.seconds * 1000),
                new Date(),
                {
                  addSuffix: true,
                  locale: locale[localeLang],
                }
              )}
            </div>
          </div>
        </div>
        {authenticated && currentUser.uid === pin.ownerUid && (
          <UserPinMenu pin={pin} />
        )}
      </div>

      <div className='mt-1'>
        <div className='flex items-center'>
          <GoLocation />
          <span className='ml-1'>{pin.location.address}</span>
        </div>
        {pin.imgURL && (
          <img
            className='w-full h-80 mt-4 object-cover rounded-xl'
            src={pin.imgURL}
            alt='pin_image'
          />
        )}
        <div className='py-4'>
          <span>
            {pin.tags.map((tag) => (
              <span key={tag}>{`#${tag}  `}</span>
            ))}
          </span>
          <h3 className='text-3xl py-3 font-semibold text-black'>
            {pin.pinName}
          </h3>
          <div>
            <ReadOnly userText={pin.description} />
          </div>
        </div>
      </div>

      <div className='flex items-center pt-4'>
        <div className='w-8 h-8 bg-gray-200 flex items-center justify-center mr-2 rounded-sm'>
          {!isLiked && (
            <AiOutlineHeart
              className='w-5 h-5 hover:cursor-pointer hover:text-red-500'
              onClick={addLikeToDb}
            />
          )}
          {isLiked && (
            <AiFillHeart
              className='w-5 h-5 hover:cursor-pointer text-red-500'
              onClick={removeLikeFromDb}
            />
          )}
        </div>
        <span>{likeCount}</span>
      </div>
    </div>
  );
}

PinListItem.propTypes = {
  pin: PropTypes.object.isRequired,
};

export default PinListItem;
