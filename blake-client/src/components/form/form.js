import React, { useState } from 'react';
import styles from './form.module.css';
import Input from '../input/input';
import Button from '../button/button';

function Form({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onSubmit(email, password);
      }}
    >
      <Input
        placeholder="Email"
        id="email"
        value={email}
        label="email"
        type="email"
        handleChange={handleEmail}
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        label="password"
        type="password"
        handleChange={handlePassword}
      />

      <Button
        primary={false}
        textValue="Sign Up"
        className={styles.signupButton}
      />
    </form>
  );
}

export default Form;
