import React from 'react';

const Button = ({ value, onClick }) => (
  <button
    className="calculator__button"
    value={value}
    onClick={(e) => onClick(e, value)}
    type="button"
  >
    {value}
  </button>
);

export default Button;
