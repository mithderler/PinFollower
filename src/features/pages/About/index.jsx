import { useTranslation } from 'react-i18next';

import DefaultLayout from '../../../app/layout/DefaultLayout';
import En from './En';
import Tr from './Tr';

function About() {
  const { t, i18n } = useTranslation();

  let docEl;
  switch (i18n.language) {
    case 'tr':
      docEl = <Tr />;
      break;
    default:
      docEl = <En />;
  }

  return (
    <DefaultLayout title={t('pages.about')} containerWidth='max-w-6xl'>
      {docEl}
    </DefaultLayout>
  );
}

export default About;
