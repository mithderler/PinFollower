import React from 'react';
import { useTranslation } from 'react-i18next';

import DocumentLayout from '../../../../app/layout/DocumentLayout';
import En from './En';
import Tr from './Tr';

function PrivacyPolicy() {
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
    <DocumentLayout
      title={t('pages.polices.privacy_policy')}
      containerWidth='max-w-6xl'
    >
      {docEl}
    </DocumentLayout>
  );
}

export default PrivacyPolicy;