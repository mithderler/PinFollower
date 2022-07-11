import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import CropedImgEl from './CropedImgEl';
import ProgressBar2 from './ProgressBar2';
import getCroppedImg from './cropImage';

const PhotoCropper = ({ name, rounded, fieldName, directory }) => {
  const { t } = useTranslation();
  const [meta, helpers] = useField(name);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [cropped, setCropped] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { setValue } = helpers;

  const onCropComplete = useCallback((croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageObj = await getCroppedImg(
        meta.value.imgURL,
        croppedAreaPixels
      );
      setCroppedImage(croppedImageObj.blob);
      setCroppedImageURL(croppedImageObj.url);
      setCropped(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const confirmCroppedImage = () => {
    setValue({ ...meta.value, croppedFile: croppedImage });
    setConfirmed(true);
  };

  return (
    <>
      {!confirmed && (
        <div>
          <div className='relative w-full h-[200px] bg-[#333]'>
            <Cropper
              image={meta.value.imgURL}
              crop={crop}
              zoom={zoom}
              aspect={fieldName ? 3 / 3 : 4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className='p-2 mt-2 items-center block space-y-2 md:flex text-center'>
            {croppedImage && (
              <div className='flex w-full justify-center md:flex-1'>
                <CropedImgEl src={croppedImageURL} onClose={onClose} />
              </div>
            )}
            <div className='block md:inline-block flex-1 items-center'>
              <div className='text-center'>{t('photo_cropper.zoom')}</div>
              <input
                type='range'
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                className='py-0 px-2 w-full'
                onChange={(e) => setZoom(e.target.value)}
              />
            </div>
            <div className='block md:flex-2'>
              <button
                type='button'
                onClick={showCroppedImage}
                className='text-white bg-blue-600 rounded py-2 px-4 ml-3'
              >
                {t('photo_cropper.crop_image')}
              </button>
              <button
                type='button'
                onClick={confirmCroppedImage}
                className='text-white bg-blue-600 rounded py-2 px-4 ml-3 disabled:bg-gray-400'
                disabled={!cropped}
              >
                {t('photo_cropper.confirm_image')}
              </button>
            </div>
          </div>
        </div>
      )}
      {confirmed && (
        <>
          {/* <div>
            <img src={meta.value.imgURL} />
          </div> */}
          <div className='w-full h-64 flex justify-center items-center'>
            <img
              src={meta.value.croppedImgURL}
              className={`h-full w-full object-contain ${
                rounded ? 'h-40 w-40 rounded-full' : ''
              }`}
            />
          </div>
        </>
      )}
      {confirmed && !meta.value.croppedImgURL && (
        <ProgressBar2
          file={croppedImage}
          setValue={setValue}
          filename={meta.value.fileName}
          meta={meta}
          fieldName={fieldName}
          directory={directory}
        />
      )}
    </>
  );
};

PhotoCropper.propTypes = {
  name: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  fieldName: PropTypes.string,
  directory: PropTypes.string,
};

export default PhotoCropper;
