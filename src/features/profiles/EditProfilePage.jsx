import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { AiOutlineCamera } from 'react-icons/ai';
import ReactTooltip from 'react-tooltip';

import useDocTitle from '../../app/hooks/useDocTitle';
import DefaultLayout from '../../app/layout/DefaultLayout';
import TextArea from '../../app/common/form/TextArea';
import FileInput from '../pins/newPin/FileInput';
import PhotoCropper from '../pins/newPin/photoCropper/PhotoCropper';
import ButtonMain from '../../app/common/buttons/ButtonMain';
import { PROFILE_PHOTOS } from '../../app/common/constants/storageConstants';
import { updateUserProfileData } from '../../app/firebase/firestoreService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUserProfile } = useSelector((state) => state.profile);

  useDocTitle(t('profile.edit'));
  const fileTypes = ['image/png', 'image/jpeg'];

  function convertData({ biograph, newProfilePhoto }) {
    return {
      bio: biograph,
      photoURL: newProfilePhoto?.croppedImgURL,
    };
  }

  return (
    <DefaultLayout title={t('profile.edit')} containerWidth='max-w-2xl'>
      <Formik
        initialValues={{
          newProfilePhoto: {
            file: null,
            fileName: '',
            imgURL: null,
            croppedFile: null,
            croppedImgURL: null,
          },
          biograph: currentUserProfile?.bio,
        }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          const convertedData = convertData(values);
          try {
            await updateUserProfileData(currentUserProfile, convertedData);
            navigate(`/profiles/${currentUserProfile?.uid}`);
          } catch (error) {
            toast.error(error.message);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors, values }) => (
          <Form>
            <Label
              title={t('profile.edit.profile_photo')}
              htmlFor='newProfilePhoto'
            >
              <div className='flex w-full justify-center py-2'>
                {!values.newProfilePhoto.imgURL && (
                  <>
                    {' '}
                    <FileInput
                      name='newProfilePhoto'
                      fileTypes={fileTypes}
                      fieldName='newProfilePhoto'
                      directory={PROFILE_PHOTOS}
                      hiddenButton
                    />
                    <div className='flex w-full justify-center py-4 relative'>
                      <img
                        src={
                          currentUserProfile?.photoURL || '/assets/img/user.png'
                        }
                        className='h-20 w-20 md:h-36 md:w-36 rounded-full object-cover '
                        referrerPolicy='no-referrer'
                        alt='user'
                      />
                      <div
                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-1 border bg-slate-600 rounded-full outline-none h-16 w-16 opacity-70 hover:cursor-pointer hover:bg-slate-500'
                        alt={t('profile.edit.add_photo')}
                        data-tip
                        data-for='profilePhotoTip'
                      >
                        <AiOutlineCamera className='text-3xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                      </div>
                      <ReactTooltip
                        id='profilePhotoTip'
                        place='bottom'
                        effect='solid'
                        offset={{ right: 60 }}
                        delayShow={1000}
                        backgroundColor='#555'
                        arrowColor='transparent'
                      >
                        {t('profile.edit.add_photo')}
                      </ReactTooltip>
                    </div>
                  </>
                )}
                {values.newProfilePhoto.imgURL && (
                  <PhotoCropper
                    name='newProfilePhoto'
                    rounded
                    fieldName='newProfilePhoto'
                    directory={PROFILE_PHOTOS}
                  />
                )}
              </div>
            </Label>
            <Label title={t('profile.edit.bio')} htmlFor='biograph'>
              <TextArea name='biograph' id='biograph' rows='3' />
            </Label>
            <ButtonMain type='submit' className='rounded-3xl'>
              {t('profile.edit.update')}
            </ButtonMain>
          </Form>
        )}
      </Formik>
    </DefaultLayout>
  );
}

function Label({ title, htmlFor, children }) {
  return (
    <div className='w-full flex flex-col mb-4'>
      <label className='mb-2 font-medium' htmlFor={htmlFor}>
        {title}
        {children}
      </label>
    </div>
  );
}

export default EditProfilePage;
