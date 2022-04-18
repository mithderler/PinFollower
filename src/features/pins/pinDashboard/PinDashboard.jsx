import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import useDocTitle from '../../../app/hooks/useDocTitle';
import ScrollButton from '../../../app/layout/ScrollButton';
import Footer from '../../footer/Footer';
import Navbar from '../../nav/Navbar';
import PinList from './PinList';

function PinDashboard() {
  const { authenticated } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const title = authenticated
    ? t('navbar.navlinks.home')
    : t('navbar.navlinks.explore');

  useDocTitle(title);

  return (
    <div className='bg-[#f8f8f8]'>
      <Navbar />
      <div className='container mx-auto max-w-[600px] px-4 pt-24'>
        <PinList />
        <ScrollButton />
      </div>
      <Footer />
    </div>
  );
}

export default PinDashboard;
