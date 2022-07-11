import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ButtonMain from '../../app/common/buttons/ButtonMain';

function ProfileContent({ profile, isCurrentUser }) {
  const { t } = useTranslation();

  return (
    <div className='flex max-w-2xl w-full'>
      <div className='flex justify-center p-8 max-w-xs'>
        <img
          src={profile?.photoURL || '/assets/img/user.png'}
          className='h-20 w-20 md:h-36 md:w-36 rounded-full object-cover'
          referrerPolicy='no-referrer'
          alt='user'
        />
      </div>
      <div className='max-w-md w-full p-2'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-xl text-link font-semibold'>
            {profile?.displayName}
          </span>
          <div>
            {isCurrentUser && (
              <ButtonMain className='bg-transparent text-link  hover:text-white border border-link text-sm !px-3 py-2'>
                <Link to={`/settings/profile`}>{t('profile.edit')}</Link>
              </ButtonMain>
            )}
          </div>
        </div>
        <div className='py-2 mb-3'>
          <div className='flex justify-between items-center py-1'>
            <div>
              <span className='font-semibold'>9</span>{' '}
              <span>{t('profile.pins')}</span>
            </div>
            <div>
              <span className='font-semibold'>7</span>{' '}
              <span>{t('profile.followers')}</span>
            </div>
          </div>

          <div className='flex justify-between items-center py-1'>
            <div>
              <span className='font-semibold'>1</span>{' '}
              <span>{t('profile.boards')}</span>
            </div>
            <div>
              <span className='font-semibold'>3</span>{' '}
              <span>{t('profile.following')}</span>
            </div>
          </div>
        </div>
        <div>{profile?.bio}</div>
      </div>
    </div>
  );
}

ProfileContent.propTypes = {
  profile: PropTypes.object.isRequired,
  isCurrentUser: PropTypes.bool.isRequired,
};

export default ProfileContent;
