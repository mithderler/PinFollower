import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import CropedImgEl from './CropedImgEl';
import getCroppedImg from './cropImage';
import { useField } from 'formik';
import ProgressBar2 from './ProgressBar2';

const PhotoCropper = ({ ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const { setValue, setError } = helpers;

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImageObj = await getCroppedImg(
        meta.value.imgURL,
        croppedAreaPixels
      );
      console.log('donee', { croppedImageObj });
      // const croppedImage = croppedImageObj.blob;
      setCroppedImage(croppedImageObj.blob);
      setCroppedImageURL(croppedImageObj.url);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const confirmCroppedImage = () => {
    console.log('crpImg: ', croppedImage);
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
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className='p-2 flex items-center'>
            {croppedImage && (
              <CropedImgEl src={croppedImageURL} onClose={onClose} />
            )}
            <div className='block flex-1 items-center'>
              <div className='text-center'>ZOOM</div>
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
            <button
              type='button'
              onClick={showCroppedImage}
              className='text-white bg-blue-600 rounded py-2 px-4 ml-3'
            >
              Show Cropped
            </button>
            <button
              type='button'
              onClick={confirmCroppedImage}
              className='text-white bg-blue-600 rounded py-2 px-4 ml-3'
            >
              Confirm Image
            </button>
          </div>
        </div>
      )}
      {confirmed && (
        <>
          {/* <div>
            <img src={meta.value.imgURL} />
          </div> */}
          <div className='w-full h-64'>
            <img
              src={meta.value.croppedImgURL}
              className='h-full w-full object-contain'
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
        />
      )}
    </>
  );
};

export default PhotoCropper;
