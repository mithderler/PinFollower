import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import useDocTitle from '../../app/hooks/useDocTitle';
import DocumentLayout from '../../app/layout/DocumentLayout';
import TextArea from '../../app/common/form/TextArea';
import FileInput from '../pins/newPin/FileInput';
import PhotoCropper from '../pins/newPin/photoCropper/PhotoCropper';

function EditProfilePage() {
  const { t } = useTranslation();
  const { currentUserProfile } = useSelector((state) => state.profile);

  useDocTitle(t('profile.edit'));
  const fileTypes = ['image/png', 'image/jpeg'];

  return (
    <DocumentLayout title={t('profile.edit')} containerWidth='max-w-2xl'>
      <Formik
        initialValues={{ newImgURL: null, biograph: '' }}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          console.log('values: ', values);
        }}
      >
        {({ isSubmitting, isValid, dirty, errors, values }) => (
          <Form>
            <Label title='Cover Photo' htmlFor='newImgURL'>
              {/* {!values.newImgURL && (
                <FileInput name='newImgURL' fileTypes={fileTypes} />
              )}
              {values.newImgURL && <PhotoCropper name='newImgURL' />} */}
            </Label>
            <div className='flex flex-col items-center w-full'>
              <div className='flex max-w-2xl w-full'>
                <img
                  src={currentUserProfile?.photoURL || '/assets/img/user.png'}
                  className='h-20 w-20 md:h-36 md:w-36 rounded-full object-cover'
                  referrerPolicy='no-referrer'
                  alt='user'
                />
              </div>
            </div>
            <Label title='Cover Photo Description' htmlFor='biograph'>
              <TextArea name='biograph' id='biograph' rows='7' />
            </Label>
          </Form>
        )}
      </Formik>
    </DocumentLayout>
  );
}

function Label({ title, htmlFor, children }) {
  return (
    <div className='w-full flex flex-col mb-4'>
      <label className='mb-2 font-medium' htmlFor={htmlFor}>
        {title}
      </label>
      {children}
    </div>
  );
}

export default EditProfilePage;
