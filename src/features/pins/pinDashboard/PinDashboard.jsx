import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import DefaultLayout from '../../../app/layout/DefaultLayout';
import PinList from './PinList';
import useDocTitle from '../../../app/hooks/useDocTitle';

function PinDashboard() {
  const { authenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();

  const title = authenticated
    ? t('navbar.navlinks.home')
    : t('navbar.navlinks.explore');
  useDocTitle(title);

  return (
    <DefaultLayout bgColor='bg-inherit'>
      <PinList />
    </DefaultLayout>
  );
}

export default PinDashboard;
