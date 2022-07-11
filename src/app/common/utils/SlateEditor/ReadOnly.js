import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  MaterialSlate,
  MaterialEditable,
  createMaterialEditor,
  HoveringToolbar,
} from './Editor';

//Initial contents of the editor
// import initialValue from './initialValue';

/**
 * Basic Material Slate example
 */
export default function ReadOnly({ userText }) {
  // Holds the value of the editor
  const [value, setValue] = useState(userText);

  // An instance of material editor. It is an slate editor with a few more functions
  const editor = useMemo(() => createMaterialEditor(), []);

  return (
    <MaterialSlate
      editor={editor}
      value={value}
      onChange={(value) => setValue(value)}
    >
      <HoveringToolbar></HoveringToolbar>
      <MaterialEditable readOnly={true} />
    </MaterialSlate>
  );
}

ReadOnly.propTypes = {
  userText: PropTypes.array,
};
