import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getUserProfileRef,
  organizeSnapshotDoc,
} from '../../app/firebase/firestoreService';
import { onSnapshot } from 'firebase/firestore';

import DocumentLayout from '../../app/layout/DocumentLayout';
import ProfileContent from './ProfileContent';
import { profileActions } from './profileReducer';
import { asyncActions } from '../../app/async/asyncReducer';
import Spinner from '../../app/common/spinner/Spinner';

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
          console.log('User not found!');
          dispatch(
            asyncActions.asyncActionError({
              code: 'not-found',
              message: 'Could not find document',
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
    <DocumentLayout
      title={t('profile.title')}
      containerWidth='max-w-6xl'
      bgColor='bg-inherit'
    >
      <div className='flex flex-col items-center w-full'>
        <ProfileContent
          profile={profile}
          isCurrentUser={currentUser?.uid === profile?.uid}
        />
        {/* <div>Pins Map</div> */}
      </div>
    </DocumentLayout>
  );
}

export default ProfilePage;
