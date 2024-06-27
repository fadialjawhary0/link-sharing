import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './SignupStyles.scss';

import devlinksLogo from '../../../../assets/logo-devlinks-large.svg';
import emailIcon from '../../../../assets/icon-email.svg';
import passwordIcon from '../../../../assets/icon-password.svg';

import { SignupErrors } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';
import { AuthContext } from '../../../../contexts/auth.context';
import Button from '../../../../component/Button';

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '', confirmPass: '', signup: '' });
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
        e?.code === 'auth/email-already-in-use'
          ? setErrorMessages({ ...errorMessages, signup: 'Email already in use' })
          : setErrorMessages({ ...errorMessages, signup: 'An error occurred. Please try again' });
      } finally {
        setLoading(false);
      }
    }
  };

  const borderErrorStyle = { border: '1px solid red' };

  return (
    <main className='signup-main'>
      <section className='signupSection'>
        <img src={devlinksLogo} alt='devlinks' />
        <div className='signupContainer'>
          <h1>Create account</h1>
          <p className='body-m'>Let's get you started sharing your links</p>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='inputGroup'>
              <label>
                <p className='body-s'>Email address</p>
              </label>
              <img src={emailIcon} alt='email icon' />
              <input ref={emailRef} type='email' placeholder='e.g. alex@email.com' name='email' style={errorMessages.email ? borderErrorStyle : {}} />
              {errorMessages?.email && <p className='body-s error'>{errorMessages?.email}</p>}
            </div>
            <div className='inputGroup'>
              <label>
                <p className='body-s'>Create password</p>
              </label>
              <img src={passwordIcon} alt='password icon' />
              <input ref={passwordRef} type='password' placeholder='At least 8 characters' style={errorMessages.password ? borderErrorStyle : {}} />
              {errorMessages?.password && <p className='body-s error'>{errorMessages?.password}</p>}
            </div>
            <div className='inputGroup'>
              <label>
                <p className='body-s'>Confirm password</p>
              </label>
              <img src={passwordIcon} alt='password icon' />
              <input ref={confirmPasswordRef} type='password' placeholder='At least 8 characters' style={errorMessages.confirmPass ? borderErrorStyle : {}} />
              {errorMessages?.confirmPass && <p className='body-s error'>{errorMessages?.confirmPass}</p>}
            </div>
            <p className='body-s'>Password must contain at least 8 characters</p>

            <Button loading={loading} text='Create new account' />
            <p className='body-m'>
              Already have an account?{' '}
              <Link to='/login' className='login-btn'>
                Login
              </Link>
            </p>
          </form>
          {errorMessages.signup && <h3 className='body-s error authError'>{errorMessages.signup}</h3>}
        </div>
      </section>
    </main>
  );
};

export default Signup;
