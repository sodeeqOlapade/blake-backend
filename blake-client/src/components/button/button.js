import React from 'react';
import styles from './button.module.css';

function Button({ primary, textValue }) {
  return primary ? (
    <button className={styles.primary}>{textValue}</button>
  ) : (
    <button className={styles.secondary}>{textValue}</button>
  );
}

export default Button;
