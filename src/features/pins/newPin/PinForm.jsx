/* global google */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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

function PinForm({ selectedPin }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const fileTypes = ['image/png', 'image/jpeg'];

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
        const tags = getTagsArr(values.tags);
        const editedValues = { ...values, tags };
        try {
          console.log('act');
          if (selectedPin) {
            await updatePinInFirestore(editedValues, selectedPin.id);
          } else {
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
          <Label title={t('pin_form.pin_name')} htmlFor='pinName'>
            <TextInput name='pinName' type='text' id='pinName' />
          </Label>
          <Label title={t('pin_form.pin_address')} htmlFor='location'>
            <PinMap name='location' />
          </Label>
          <Label
            title={t('pin_form.cover_photo')}
            htmlFor='coverPhoto'
            className='space-y-1'
          >
            {(!values.coverPhoto.imgURL ||
              (!values.coverPhoto.file && selectedPin?.imgURL)) && (
              <FileInput name='coverPhoto' fileTypes={fileTypes} />
            )}
            {values.coverPhoto.imgURL && <PhotoCropper name='coverPhoto' />}
          </Label>
          <Label
            title={t('pin_form.cover_photo_description')}
            htmlFor='photoDescription'
          >
            <TextArea name='photoDescription' id='photoDescription' rows='7' />
          </Label>
          <Label title={t('pin_form.pin_tags')} htmlFor='tags'>
            <TextInput
              name='tags'
              type='text'
              id='tags'
              placeholder={t('pin_form.pin_tags_placeholder')}
            />
            <span className='text-sm text-gray-500 mt-1'>
              {t('pin_form.tag_description')}
            </span>
          </Label>
          <Label title={t('pin_form.pin_description')} htmlFor='description'>
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

PinForm.propTypes = {
  selectedPin: PropTypes.object,
};

Label.propTypes = {
  title: PropTypes.string.isRequired,
  htmlFor: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default PinForm;
