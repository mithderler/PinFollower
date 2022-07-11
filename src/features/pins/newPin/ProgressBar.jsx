import { useEffect } from 'react';
import PropTypes from 'prop-types';

import useStorageForImage from '../../../app/hooks/useStorageForImage';

const ProgressBar = ({ file, meta, setValue, fieldName, directory }) => {
  const { imgURL, progress } = useStorageForImage(
    file,
    meta.value.fileName,
    fieldName,
    directory
  );

  useEffect(() => {
    if (imgURL) {
      setValue({ ...meta.value, imgURL });
    }
  }, [imgURL]);

  return (
    <div
      className='h-1 bg-green-400 mt-5'
      style={{ width: progress + '%' }}
    ></div>
  );
};

ProgressBar.propTypes = {
  setValue: PropTypes.func.isRequired,
  fieldName: PropTypes.string,
  directory: PropTypes.string,
};

export default ProgressBar;
