import React from 'react';
import styles from './sidenav.module.css';
import { Link } from 'react-router-dom';

function Sidenav() {
  return (
    <div className={styles.navContainer}>
      <nav className={styles.sideNav}>
        <ul className={styles.navItems}>
          <Link className={styles.navItem}>
            <i className="fa fa-telegram" aria-hidden="true" />
            Followings
          </Link>
          <Link className={styles.navItem}><i className="fa fa-comments" aria-hidden="true"></i>Reactions</Link>
          <Link className={styles.navItem}>
            <i className="fa fa-user" aria-hidden="true" />
            Profile
          </Link>
        </ul>

        <ul className={styles.logoutUl}>
          <Link className={styles.logout}>
            <i className="fa fa-sign-out" aria-hidden="true" />
            Logout
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Sidenav;
