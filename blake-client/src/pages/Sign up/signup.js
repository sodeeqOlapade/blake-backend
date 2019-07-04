import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './signup.module.css';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

function Signup() {
  return (
    <>
      <Header />
      <section className={styles.mainSection}>
        <div className={styles.scalfold}>
          <div className={styles.display}>
            <span className={styles.blake}>.Blake</span>
            <h4>
              img elements must have an alt prop, either with meaningful text,
              or an empty string for decorative images
            </h4>
          </div>

          <div className={styles.form}>
            <div className={styles.signupTitle}>
              <h2>SIGN UP</h2>
            </div>
            <form>
              <Input
                placeholder="Name"
                id="name"
                value=""
                label="name"
                type="text"
              />
              <Input
                placeholder="Email"
                id="email"
                value=""
                label="email"
                type="email"
              />
              <Input
                placeholder="Mobile number"
                id="mobile-number"
                value=""
                label="mobile-number"
                type="number"
              />
              <Input
                placeholder="Password"
                id="password"
                value=""
                label="password"
                type="password"
              />

              <Button
                primary={true}
                textValue="Sign Up"
                className={styles.primary}
              />
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Signup;
