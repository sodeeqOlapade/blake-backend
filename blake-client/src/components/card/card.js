import React from 'react';
import styles from './card.module.css';

function Card({ imagename, title, description }) {
  return (
    <div className={styles.card}>
      <img src={require(`../../../assets/images/${imagename}`)} />
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default Card;
