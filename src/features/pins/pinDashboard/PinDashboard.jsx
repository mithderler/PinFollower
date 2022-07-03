import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import useDocTitle from '../../../app/hooks/useDocTitle';
import PinList from './PinList';
import DocumentLayout from '../../../app/layout/DocumentLayout';

function PinDashboard() {
  const { authenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const title = authenticated
    ? t('navbar.navlinks.home')
    : t('navbar.navlinks.explore');

  useDocTitle(title);

  return (
    <DocumentLayout bgColor='bg-inherit'>
      <PinList />
    </DocumentLayout>
  );
}

export default PinDashboard;
