/* global google */
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import ButtonMain from '../../../app/common/buttons/ButtonMain';
import FileInput from './FileInput';
import HoveringTextEditor from '../../../app/common/form/FormRichText';
import PhotoCropper from './photoCropper/PhotoCropper';
import PinMap from './googleMap/PinMap';
import TextArea from '../../../app/common/form/TextArea';
import TextInput from '../../../app/common/form/TextInput';
import {
  addPinToFirestore,
  updatePinInFirestore,
} from '../../../app/firebase/firestoreService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function PinForm({ selectedPin }) {
  const fileTypes = ['image/png', 'image/jpeg'];
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        pinName: selectedPin?.pinName || '',
        location: selectedPin?.location || {
          locationName: '',
          address: '',
          latLng: null,
          newAddressSearch: false,
        },
        photoDescription: selectedPin?.photoDescription || '',
        coverPhoto: {
          file: null,
          croppedFile: null,
          fileName: '',
          imgURL: selectedPin?.imgURL || null,
          croppedImgURL: null,
        },
        tags: selectedPin?.tags.join(', ') || [],
        description: selectedPin?.description || [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
      }}
      validationSchema={Yup.object().shape({
        pinName: Yup.string().required(),
        // address: Yup.string().required(),
        photoDescription: Yup.string(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        console.log('valuess: ', values);
        const tags = getTagsArr(values.tags);
        const editedValues = { ...values, tags };
        console.log(editedValues);
        try {
          console.log('act');
          if (selectedPin) {
            console.log('activated');
            await updatePinInFirestore(editedValues, selectedPin.id);
          } else {
            console.log('deactive');
            await addPinToFirestore(editedValues);
          }
          setSubmitting(false);
          navigate('/');
        } catch (error) {
          toast.error(error.message);
          console.log('ERROR: ', error);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, isValid, dirty, errors, values }) => (
        <Form className='w-full' onKeyDown={onKeyDown}>
          <Label title='Pin Name' htmlFor='pinName'>
            <TextInput name='pinName' type='text' id='pinName' />
          </Label>
          <Label title='Address' htmlFor='location'>
            <PinMap name='location' />
          </Label>
          <Label title='Cover Photo' htmlFor='coverPhoto' className='space-y-1'>
            {(!values.coverPhoto.imgURL ||
              (!values.coverPhoto.file && selectedPin?.imgURL)) && (
              <FileInput name='coverPhoto' fileTypes={fileTypes} />
            )}
            {values.coverPhoto.imgURL && <PhotoCropper name='coverPhoto' />}
          </Label>
          <Label title='Cover Photo Description' htmlFor='photoDescription'>
            <TextArea name='photoDescription' id='photoDescription' rows='7' />
          </Label>
          <Label title='Tags' htmlFor='tags'>
            <TextInput
              name='tags'
              type='text'
              id='tags'
              placeholder='Add up to five tags (comma seperated)'
            />
            <span className='text-sm text-gray-500 mt-1'>
              Tags help people find your pin. Think of tags as the categories
              that best describe your pin.
            </span>
          </Label>
          <Label title='Pin Description' htmlFor='description'>
            <div className='h-60 w-full overflow-y-auto border border-inherit shadow-lg rounded-md'>
              <HoveringTextEditor name='description' id='description' />
            </div>
          </Label>
          <ButtonMain type='submit' className='rounded-3xl'>
            {selectedPin ? t('pin_form.update_pin') : t('pin_form.create_pin')}
          </ButtonMain>
        </Form>
      )}
    </Formik>
  );
}

function Label({ title, htmlFor, children, className }) {
  return (
    <div className={`w-full flex flex-col mb-4 ${className}`}>
      <label className='mb-2 font-medium' htmlFor={htmlFor}>
        {title}
      </label>
      {children}
    </div>
  );
}

function getTagsArr(tagsText) {
  if (tagsText.length > 0) {
    return tagsText
      .split(',')
      .map((el) => el.trim().replaceAll(' ', '').toLowerCase())
      .filter((el) => el !== '' && el.length >= 3);
  }
  return [];
}

function onKeyDown(keyEvent) {
  if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
    keyEvent.preventDefault();
  }
}

export default PinForm;
