import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.brand}>.blake</div>

      <nav className={styles.mainNavigation}>
        <ul>
          <Link to="/">Home</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
