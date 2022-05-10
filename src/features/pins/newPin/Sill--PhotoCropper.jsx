import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { useField } from 'formik';

export default function PhotoCropper({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { url } = meta.value;
  console.log('metaa: ', meta);
  let cropper;
  const onCropperInit = (component) => {
    cropper = component;
  };

  const cropImage = () => {
    if (cropper && typeof cropper.getCroppedCanvas() === 'undefined') return;

    cropper.getCroppedCanvas().toBlob((blob) => {
      // helpers.setValue({file:blob, url});
    }, 'image/jpeg');
  };

  return (
    <Cropper
      src={url}
      style={{ height: 200, width: '50%' }}
      // Cropper.js options
      initialAspectRatio={1}
      preview='.img-preview'
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
      onInitialized={onCropperInit}
    />
  );
}
