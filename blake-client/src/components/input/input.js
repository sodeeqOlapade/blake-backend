import React from 'react';
import styles from './input.module.css';

function Input({ label, id, placeholder, value, type, handleChange }) {
  return (
    <label htmlFor={label}>
      {/* {label.toUpperCase()} */}
      <input
        id={id}
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={handleChange}
      />
    </label>
  );
}

export default Input;
