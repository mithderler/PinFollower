import { useField } from 'formik';
import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import ProgressBar from '../../../features/pins/newPin/ProgressBar';
import { getFileExtension } from '../../../app/common/util/helpers';

function FileInput({ fileTypes, ...props }) {
  const [field, meta, helpers] = useField(props.name);
  const { error } = meta;
  const { file, imgURL } = meta.value;
  const { setValue, setError } = helpers;

  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      let selectedFile = e.target.files[0];
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        const fileName = uuidv4() + '.' + getFileExtension(selectedFile.name);
        setValue({ ...meta.value, file: selectedFile, fileName });
        setError(null);
      } else {
        // setValue({ file: null, imgURL: null });
        setError('Please select a valid file format');
      }
    }
  }

  if (error) console.log('Error: ', error);

  return (
    <>
      <input
        className='block w-full text-sm text-gray-500 file:py-2 file:px-6 file:rounded file:border-1 file:border-gray-400'
        name={props.name}
        id={props.name}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
      />
      {file && <ProgressBar meta={meta} file={file} setValue={setValue} />}
      {meta.touched && meta.error ? (
        <div className='text-xs text-red-500 pt-2' data-testid='errorEl'>
          {meta.error}
        </div>
      ) : null}
    </>
  );
}

export default FileInput;
