import React from 'react';
import { useField, Field } from 'formik';

function TextInput({ ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <Field
        {...field}
        {...props}
        className='border rounded p-3 w-full shadow focus:outline-none focus:border-blue-500 focus:shadow-outline'
      />
      {meta.touched && meta.error ? (
        <div className='text-xs text-red-500 pt-2' data-testid='errorEl'>
          {meta.error}
        </div>
      ) : null}
    </>
  );
}

export default TextInput;
