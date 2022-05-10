import React, { useEffect, useMemo } from 'react';
import { useField } from 'formik';
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  HoveringToolbar,
} from '../util/SlateEditor/Editor';

const FormRichText = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const editor = useMemo(() => createMaterialEditor(), []);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <MaterialSlate
      name='description'
      value={value}
      editor={editor}
      onChange={(value) => setValue(value)}
    >
      <HoveringToolbar />
      <MaterialEditable />
    </MaterialSlate>
  );
};

export default FormRichText;
