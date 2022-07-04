import React from 'react';
import { useTranslation } from 'react-i18next';

import DefaultLayout from '../../../../app/layout/DefaultLayout';
import En from './En';
import Tr from './Tr';

function TermsOfUse() {
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
      title={t('pages.polices.terms_of_use')}
      containerWidth='max-w-6xl'
    >
      {docEl}
    </DefaultLayout>
  );
}

export default TermsOfUse;
