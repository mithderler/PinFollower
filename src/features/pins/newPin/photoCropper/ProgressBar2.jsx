import { useField } from 'formik';
import { useEffect } from 'react';
import useStorageForImage from '../../../../app/hooks/useStorageForImage';

const ProgressBar2 = ({ file, setValue, filename, meta }) => {
  const { imgURL, progress } = useStorageForImage(file, filename);

  useEffect(() => {
    if (imgURL) {
      setValue({ ...meta.value, croppedImgURL: imgURL });
      console.log('new URLL: ', imgURL);
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
