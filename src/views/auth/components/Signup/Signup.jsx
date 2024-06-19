import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Signup.module.scss';

import devlinksLogo from '../../../../assets/logo-devlinks-large.svg';
import emailIcon from '../../../../assets/icon-email.svg';
import passwordIcon from '../../../../assets/icon-password.svg';

import { SignupErrors } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';
import { AuthContext } from '../../../../contexts/auth.context';

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '', confirmPass: '' });
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useContext(AuthContext);

  /*
    This function validates the email, password and confirm password inputs
    and returns an object containing the error messages for each input.

    @param {string} email - The email input value
    @param {string} password - The password input value
    @param {string} confirmPassword - The confirm password input value
    @returns {object} - An object containing the error messages for each input
  */
  const validateInputs = (email, password, confirmPassword) => {
    return {
      email: !email.trim() ? SignupErrors?.Email : ValidationHelper.isEmail(email) ? '' : SignupErrors?.InvalidEmail,
      password: password.trim() && password.trim().length >= 8 ? '' : SignupErrors?.Password,
      confirmPass: confirmPassword === password ? '' : SignupErrors?.ConfirmPassword,
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
    const confirmPassword = confirmPasswordRef.current.value;

    const validationErrors = validateInputs(email, password, confirmPassword);
    setErrorMessages(validationErrors);

    const isValidInputs = !Object.values(validationErrors).some(Boolean);

    if (isValidInputs) {
      try {
        setLoading(true);
        await signup(email, password);
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
      <section className={styles.signupSection}>
        <img src={devlinksLogo} alt='devlinks' />
        <div className={styles.signupContainer}>
          <h1>Create account</h1>
          <p className='body-m'>Let's get you started sharing your links</p>
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
              <input ref={passwordRef} type='password' placeholder='At least 8 characters' style={errorMessages.password ? borderErrorStyle : {}} />
              {errorMessages?.password && <p className={`body-s ${styles.error}`}>{errorMessages?.password}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label>
                <p className='body-s'>Confirm password</p>
              </label>
              <img src={passwordIcon} alt='password icon' />
              <input ref={confirmPasswordRef} type='password' placeholder='At least 8 characters' style={errorMessages.confirmPass ? borderErrorStyle : {}} />
              {errorMessages?.confirmPass && <p className={`body-s ${styles.error}`}>{errorMessages?.confirmPass}</p>}
            </div>
            <p className='body-s'>Password must contain at least 8 characters</p>
            <button disabled={loading} className='submit-btn'>
              Create new account
            </button>
            <p className='body-m'>
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Signup;
