import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import DefaultLayout from '../../../app/layout/DefaultLayout';
import PinForm from './PinForm';

function EditPinPage() {
  const params = useParams();
  const { pins } = useSelector((state) => state.pin);
  const selectedPin = pins.find((pin) => pin.id === params.pinId);
  return (
    <DefaultLayout containerWidth='max-w-3xl lg:max-w-4xl' marginTop='mt-12'>
      <PinForm selectedPin={selectedPin} />
    </DefaultLayout>
  );
}

export default EditPinPage;
