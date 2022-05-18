import React, { useEffect, useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { AiOutlineHeart } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { formatDistance } from 'date-fns';
import * as locale from 'date-fns/locale';

import ReadOnly from '../../../app/common/util/SlateEditor/ReadOnly';

function PinListItem({ pin }) {
  const [localeLang, setLocaleLang] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === 'en') {
      setLocaleLang('enUS');
    } else {
      setLocaleLang(i18n.language);
    }
  }, [i18n.language]);

  return (
    <div className='bg-white rounded-xl pb-4 px-4 mb-10'>
      <div className='h-14 flex items-center'>
        <img
          src={pin.ownerPhotoURL || '/assets/img/user.png'}
          className='h-10 w-10 rounded-full mr-2'
          alt='user'
        />
        <div className='block m-2'>
          <span className='text-lg text-black'>{pin.ownerUsername}</span>
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

      <div className='mt-1'>
        <div className='flex items-center'>
          <GoLocation />
          <span className='ml-1'>{pin.location.address}</span>
        </div>
        <img
          className='w-full h-80 mt-4 object-cover rounded-xl'
          src={pin.imgURL}
          alt='pin_image'
        />
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
          <AiOutlineHeart />
        </div>
        <span>2</span>
      </div>
    </div>
  );
}

export default PinListItem;
