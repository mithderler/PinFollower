import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function CropedImgEl({ src }) {
  const { t } = useTranslation();
  return (
    <div className={`relative w-40 h-30 mr-3 z-10`}>
      <div className='absolute'>
        <span className='text-gray-700 bg-white opacity-50 p-1'>
          {t('photo_cropper.cropper_element.cropped_img')}
        </span>
      </div>
      <div className=''>
        <img src={src} alt='Cropped' />
      </div>
    </div>
  );
}

CropedImgEl.propTypes = {
  src: PropTypes.string.isRequired,
};

export default CropedImgEl;
