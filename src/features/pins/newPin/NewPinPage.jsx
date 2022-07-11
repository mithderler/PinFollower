import DefaultLayout from '../../../app/layout/DefaultLayout';
import PinForm from './PinForm';

function NewPinPage() {
  return (
    <DefaultLayout containerWidth='max-w-3xl lg:max-w-4xl' marginTop='mt-12'>
      <PinForm />
    </DefaultLayout>
  );
}

export default NewPinPage;
