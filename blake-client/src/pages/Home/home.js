import React, { useContext } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './home.module.css';
import Button from '../../components/button/button';
import { Link } from 'react-router-dom';
import Card from '../../components/card/card';
import LoginstatusContext from '../../context';

function Home(props) {
  const loogedIn = useContext(LoginstatusContext);
  console.log('from home: ', loogedIn);
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
            <Link to="/signup">
              <Button
                primary={true}
                textValue="Get Started"
                className={styles.primary}
              />
            </Link>
            <Link to="/about">
              <Button primary={false} textValue="Read More" />
            </Link>
          </div>
        </div>

        <div className={styles.bannerPic} />
      </div>

      <h2 className={styles.pros}>With Blake, you've got...</h2>

      <div className={styles.cards}>
        <Card
          title="24/7 Support"
          imagename="clock-icon.png"
          description="img elements must have an alt prop, either with meaningful text, or an empty string for decorative images "
        />
        <Card
          title="Convenience"
          imagename="convenience.svg"
          description="img elements must have an alt prop, either with meaningful text, or an empty string for decorative images "
        />{' '}
        <Card
          title="No Paper work"
          imagename="paperwork.png"
          description="img elements must have an alt prop, either with meaningful text, or an empty string for decorative images "
        />
        <Card
          title="Remote Access"
          imagename="remote.png"
          description="img elements must have an alt prop, either with meaningful text, or an empty string for decorative images "
        />
        <Card
          title="Reduced Cost"
          imagename="reducedcost.png"
          description="img elements must have an alt prop, either with meaningful text, or an empty string for decorative images "
        />
        <Card
          title="Coordinated Feedback"
          imagename="feedback.png"
          description="img elements must have an alt prop, either with meaningful text, or an empty string for decorative images "
        />
      </div>
      <Footer />
    </>
  );
}

export default Home;
