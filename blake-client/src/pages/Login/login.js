import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';
import styles from './login.module.css';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Form from '../../components/form/form';
import * as firebase from 'firebase/app';
import firebaseConfig from '../../firebaseconfig';
// Add the Firebase products that you want to use
import 'firebase/auth';
// firebase.initializeApp(firebaseConfig);



function Login(props) {
  const [redirect, setRedirect] = useState(false);

  const loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response)
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
            {/* <span className={styles.blake}>.Blake</span>
            <h4>
              img elements must have an alt prop, either with meaningful text,
              or an empty string for decorative images
            </h4> */}
          </div>

          <div className={styles.form}>
            <div className={styles.signupTitle}>
              <h2>LOGIN</h2>
            </div>
            <Form onSubmit={loginUser} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
