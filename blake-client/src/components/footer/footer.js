import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer>
      <div className={styles.socialMediaIcons}>
        <div className={styles.iconsContainer}>
          <Link  className={styles.socialMediaIcon} to = 'facebook.com'>
            <i className="fa fa-facebook-square" />
            {/* <span className={styles.iconTitle}>facebook</span> */}
          </Link>
        </div>

        <div className={styles.iconsContainer}>
          <Link className={styles.socialMediaIcon} to = 'twitter.com'>
            <i className="fa fa-twitter-square" />
            {/* <span className={styles.iconTitle}>twitter</span> */}
          </Link>
        </div>

        <div className={styles.iconsContainer}>
          <Link className={styles.socialMediaIcon} to = 'instagram.com'>
            <i className="fa fa-instagram" />
            {/* <span className={styles.iconTitle}>instagram</span> */}
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
