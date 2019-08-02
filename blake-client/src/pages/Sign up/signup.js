import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import styles from './signup.module.css';
import Form from '../../components/form/form';
import LoginstatusContext from '../../context';
import app from '../../firebaseconfig';

// Add the Firebase products that you want to use
import 'firebase/auth';

function Signup() {
  const [redirect, setRedirect] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(LoginstatusContext);

  console.log('from sign up: ', loggedIn);
  console.log('from sign up: ', setLoggedIn);

  const createUser = (email, password) => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        // console.log(response);
        setLoggedIn(!!response);
        setRedirect(true);
      })
      .catch(function(error) {
        console.log('Errorrrrrr:');
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log('err: ', errorCode, 'msg: ', errorMessage);
      });
  };

  if (redirect) {
    return <Redirect to="/about" />;
  }

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
            <Form onSubmit={createUser} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Signup;
