import React from 'react';

function ButtonMain({ className, children, ...rest }) {
  return (
    <button
      {...rest}
      className={`bg-main text-white font-semibold py-3 px-7 rounded hover:bg-second transition ease-in delay-100 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonMain;
