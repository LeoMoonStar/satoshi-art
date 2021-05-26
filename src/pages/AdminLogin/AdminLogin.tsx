import React, { useState } from 'react';
import Layout from 'components/layout';

import useStyles from './AdminLogin.style';

export default function AdminLogin(): JSX.Element {
  const classes = useStyles();

  const [username, setUsername] = useState('admin@fintelics.com');
  const [password, setPassword] = useState('');

  const signin = () => {
    alert(username + ' : ' + password);
  };

  return (
    <div className={classes.box}>
      <form className={classes.loginBox} onSubmit={signin}>
        <div className={classes.loginHeader}>Admin Login</div>

        <div className={classes.loginInputBox}>
          <input
            className={classes.loginInput}
            type='email'
            placeholder='Admin e-mail'
            onChange={e => setUsername(e.target.value)}
          />

          <input
            className={classes.loginInput}
            type='password'
            placeholder='Admin password'
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button className={classes.loginSubmit} type='submit'>
          Sign-In
        </button>
      </form>
    </div>
  );
}
