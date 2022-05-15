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

function NewPinForm() {
  const fileTypes = ['image/png', 'image/jpeg'];

  return (
    <Formik
      initialValues={{
        pinName: '',
        location: {
          address: '',
          latLng: null,
          newAddressSearch: false,
        },
        photoDescription: '',
        coverPhoto: {
          file: null,
          croppedFile: null,
          fileName: '',
          imgURL: null,
          croppedImgURL: null,
        },
        tags: [],
        description: [
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
      onSubmit={(values, { setSubmitting, setErrors }) => {
        const tags = getTagsArr(values.tags);
        const editedValues = { ...values, tags };
        console.log('values: ', editedValues);
      }}
    >
      {({ isSubmitting, isValid, dirty, errors, values }) => (
        <Form className='w-full'>
          <Label title='Pin Name' htmlFor='pinName'>
            <TextInput name='pinName' type='text' id='pinName' />
          </Label>
          <Label title='Address' htmlFor='location'>
            <PinMap name='location' />
          </Label>
          <Label title='Cover Photo' htmlFor='coverPhoto'>
            {!values.coverPhoto.imgURL && (
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
            Create Pin
          </ButtonMain>
        </Form>
      )}
    </Formik>
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

function getTagsArr(tagsText) {
  if (tagsText.length > 0) {
    return tagsText.split(',').map((el) => el.trim());
  }
  return [];
}

export default NewPinForm;
