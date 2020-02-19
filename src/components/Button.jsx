import React from 'react';


const Button = ({ value, onClick }) => (
  <button
    className="calculator__button"
    value={value}
    onClick={onClick}
    type="button"
  >
    {value}
  </button>
);

export default Button;
