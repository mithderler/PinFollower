import React from 'react';
import { useTranslation } from 'react-i18next';

import DefaultLayout from '../../../../app/layout/DefaultLayout';
import En from './En';
import Tr from './Tr';

function CookiePolicy() {
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
    <DefaultLayout
      title={t('pages.polices.cookie_policy')}
      containerWidth='max-w-6xl'
    >
      {docEl}
    </DefaultLayout>
  );
}

export default CookiePolicy;
