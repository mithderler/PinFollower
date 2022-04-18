import { useEffect } from 'react';
import { APP_TRADEMARK } from '../common/constants/AppConstants';

const useDocTitle = (text) => {
  useEffect(() => {
    document.title = `${text} - ${APP_TRADEMARK}`;
  }, [text]);

  return;
};

export default useDocTitle;
