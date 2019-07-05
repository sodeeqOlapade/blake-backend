import React from 'react';
import styles from './input.module.css';

function Input({ label, id, placeholder, value, type }) {
  return (
    <label htmlFor={label}>
      {/* {label.toUpperCase()} */}
      <input id={id} placeholder={placeholder}  type = {type}/>
    </label>
  );
}

export default Input;
