import { useField } from 'formik';
import { useEffect } from 'react';
import useStorageForImage from '../../../../app/hooks/useStorageForImage';

const ProgressBar2 = ({
  file,
  setValue,
  filename,
  meta,
  fieldName,
  directory,
}) => {
  const { imgURL, progress } = useStorageForImage(
    file,
    filename,
    fieldName,
    directory
  );

  useEffect(() => {
    if (imgURL) {
      setValue({ ...meta.value, croppedImgURL: imgURL });
    }
  }, [imgURL]);

  return (
    <div
      className='h-1 bg-green-400 mt-5'
      style={{ width: progress + '%' }}
    ></div>
  );
};

export default ProgressBar2;
