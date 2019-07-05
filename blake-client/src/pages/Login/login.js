import React from 'react';
import styles from './login.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Input from '../../components/input/input';
import Button from '../../components/button/button';



function Login(props) {
  return (
    <>
      <Header />
      <section className={styles.mainSection}>
        <div className={styles.scalfold}>
          <div className={styles.display}>
            {/* <span className={styles.blake}>.Blake</span>
            <h4>
              img elements must have an alt prop, either with meaningful text,
              or an empty string for decorative images
            </h4> */}
          </div>

          <div className={styles.form}>
            <div className={styles.signupTitle}>
              <h2>SIGN UP</h2>
            </div>
            <form>
              <Input
                placeholder="Email"
                id="email"
                value=""
                label="email"
                type="email"
              />
              <Input
                placeholder="Password"
                id="password"
                value=""
                label="password"
                type="password"
              />

              <Button
                primary={false}
                textValue="Login"
                className={styles.signupButton}
              />
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
