import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';

import devlinksLogo from '../../../../assets/logo-devlinks-large.svg';
import emailIcon from '../../../../assets/icon-email.svg';
import passwordIcon from '../../../../assets/icon-password.svg';

import { SignupErrors } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';
import { AuthContext } from '../../../../contexts/auth.context';

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useContext(AuthContext);

  /*
    This function validates the email, password and confirm password inputs
    and returns an object containing the error messages for each input.

    @param {string} email - The email input value
    @param {string} password - The password input value
    @returns {object} - An object containing the error messages for each input
  */
  const validateInputs = (email, password) => {
    return {
      email: !email.trim() ? SignupErrors?.Email : ValidationHelper.isEmail(email) ? '' : SignupErrors?.InvalidEmail,
      password: password.trim() && password.trim().length >= 8 ? '' : SignupErrors?.Password,
    };
  };

  /*
    This function is called when the form is submitted.
    It validates the inputs and calls the signup function from the AuthContext.

    @param {object} e - The form submit event
  */
  const handleSubmit = async e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const validationErrors = validateInputs(email, password);
    setErrorMessages(validationErrors);

    const isValidInputs = !Object.values(validationErrors).some(Boolean);

    if (isValidInputs) {
      try {
        setLoading(true);
        await login(email, password);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const borderErrorStyle = { border: '1px solid red' };

  return (
    <main className={styles.main}>
      <section className={styles.loginSection}>
        <img src={devlinksLogo} alt='devlinks' />
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <p className='body-m'>Add your details below to get back into the app</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>
                <p className='body-s'>Email address</p>
              </label>
              <img src={emailIcon} alt='email icon' />
              <input ref={emailRef} type='email' placeholder='e.g. alex@email.com' style={errorMessages.email ? borderErrorStyle : {}} />
              {errorMessages?.email && <p className={`body-s ${styles.error}`}>{errorMessages?.email}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label>
                <p className='body-s'>Create password</p>
              </label>
              <img src={passwordIcon} alt='password icon' />
              <input ref={passwordRef} type='password' placeholder='Enter your password' style={errorMessages.password ? borderErrorStyle : {}} />
              {errorMessages?.password && <p className={`body-s ${styles.error}`}>{errorMessages?.password}</p>}
            </div>
            <button disabled={loading} className='submit-btn'>
              Login
            </button>
            <p className='body-m'>
              Don't have an account? <Link to='/signup'>Create account</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
