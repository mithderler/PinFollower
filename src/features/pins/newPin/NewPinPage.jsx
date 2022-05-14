import React from 'react';

import SignedInUserLayout from '../../../app/layout/SignedInUserLayout';
import NewPinForm from './NewPinForm';

function newPinPage() {
  return (
    <SignedInUserLayout containerWidth='max-w-3xl lg:max-w-4xl'>
      <div className='bg-white rounded-sm p-4 mb-10'>
        <NewPinForm />
      </div>
    </SignedInUserLayout>
  );
}

export default newPinPage;
