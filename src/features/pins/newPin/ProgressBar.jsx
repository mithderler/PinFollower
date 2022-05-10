import { useEffect } from 'react';
import useStorageForImage from '../../../app/hooks/useStorageForImage';
import { v4 as uuidv4 } from 'uuid';
import { getFileExtension } from '../../../app/common/util/functions';

const ProgressBar = ({ file, meta, setValue }) => {
  const { imgURL, progress } = useStorageForImage(file, meta.value.fileName);

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
