import React from 'react';

import DocumentLayout from '../../../app/layout/DocumentLayout';
import NewPinForm from './NewPinForm';

function newPinPage() {
  return (
    <DocumentLayout containerWidth='max-w-3xl lg:max-w-4xl' marginTop='mt-12'>
      <NewPinForm />
    </DocumentLayout>
  );
}

export default newPinPage;
