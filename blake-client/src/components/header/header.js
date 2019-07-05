import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.brand}>
        <Link className={styles.brandLink} to="/">
          .Blake
        </Link>
      </div>

      <nav className={styles.mainNavigation}>
        <ul className={styles.navItems}>
          <Link className={styles.navItem} to="/">
            Home
          </Link>
          <Link className={styles.navItem} to="/contact">
            Contact
          </Link>
          <Link className={styles.navItem} to="/about">
            About
          </Link>
          <Link className={styles.navItem} to="/login">
            Login
          </Link>
          <Link className={styles.navItem} to="/signup">
            Sign Up
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
