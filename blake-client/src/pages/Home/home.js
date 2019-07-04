import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './home.module.css';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';

function Home(props) {
  console.log('from home: ', props.match);
  return (
    <>
      <Header />
      <div className={styles.bannerContainer}>
        <div className={styles.bannerText}>
          <div className={styles.texts}>
            <span>
              Businesses <span className={styles.business}>build</span>
            </span>
            <span>
              Users <span className={styles.use}>use</span>
            </span>
            <span className={styles.connect}>
              .Blake <span>connects</span>
            </span>
          </div>

          <div className={styles.buttons}>
            <Link to = '/signup'>
              <Button
                primary={true}
                textValue="Get Started"
                className={styles.primary}
              />
            </Link>
            <Link to = '/about'>
              <Button primary={false} textValue="Read More" />
            </Link>
          </div>
        </div>

        <div className={styles.bannerPic} />
      </div>


      <h2>Why Choose Blake?</h2>

      <div className = {styles.cards}>
    
      </div>
      <Footer />
    </>
  );
}

export default Home;
