import { useEffect } from 'react';
import useStorageForImage from '../../../app/hooks/useStorageForImage';

const ProgressBar = ({ file, meta, setValue, fieldName, directory }) => {
  const { imgURL, progress } = useStorageForImage(
    file,
    meta.value.fileName,
    fieldName,
    directory
  );
  console.log('FILEEE: ', file);
  useEffect(() => {
    if (imgURL) {
      setValue({ ...meta.value, imgURL });
      console.log('urlss: ', imgURL);
    }
  }, [imgURL]);

  return (
    <div
      className='h-1 bg-green-400 mt-5'
      style={{ width: progress + '%' }}
    ></div>
  );
};

export default ProgressBar;
