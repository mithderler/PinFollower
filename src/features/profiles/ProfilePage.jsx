import { onSnapshot } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  getUserProfileRef,
  organizeSnapshotDoc,
} from '../../app/firebase/firestoreService';
import DefaultLayout from '../../app/layout/DefaultLayout';
import ProfileContent from './ProfileContent';
import Spinner from '../../app/common/spinner/Spinner';
import { asyncActions } from '../../app/async/asyncReducer';
import { profileActions } from './profileReducer';

function ProfilePage() {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUserProfile, selectedUserProfile } = useSelector(
    (state) => state.profile
  );
  const { currentUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.async);

  useEffect(() => {
    dispatch(asyncActions.asyncActionStart());
    const profileRef = getUserProfileRef(params.userId);
    const unsubscribe = onSnapshot(
      profileRef,
      (snapshot) => {
        if (!snapshot.exists) {
          console.log(t('profile.user_not_found'));
          dispatch(
            asyncActions.asyncActionError({
              code: t('profile.not_found'),
              message: t('profile.user_not_found'),
            })
          );
          return;
        }
        dispatch(
          profileActions.setSelectedUserProfile(organizeSnapshotDoc(snapshot))
        );
        dispatch(asyncActions.asyncActionFinish());
      },
      (error) => dispatch(asyncActions.asyncActionError(error))
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const profile =
    params?.userId === currentUser?.uid
      ? currentUserProfile
      : selectedUserProfile;

  if ((loading && !profile) || (!profile && !error)) return <Spinner />;

  return (
    <DefaultLayout
      title={t('profile.title')}
      containerWidth='max-w-6xl'
      bgColor='bg-inherit'
    >
      <div className='flex flex-col items-center w-full '>
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser?.uid === profile?.uid}
        />
        {/* <div>Pins Map</div> */}
      </div>
    </DefaultLayout>
  );
}

export default ProfilePage;
