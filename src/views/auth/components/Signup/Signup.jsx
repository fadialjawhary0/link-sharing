import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import devlinksLogo from '../../../../assets/logo-devlinks-large.svg';
import emailIcon from '../../../../assets/icon-email.svg';
import passwordIcon from '../../../../assets/icon-password.svg';

import './SignupStyles.scss';
import { SignupErrors } from '../../../../constants';
import { ValidationHelper } from '../../../../validators/validators';

const Signup = () => {
  const [errorMessages, setErrorMessages] = useState({ email: '', password: '', confirmPass: '' });

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    try {
      setErrorMessages({
        email: email.trim() ? '' : SignupErrors?.Email,
        password: password.trim() && password.trim().length >= 8 ? '' : SignupErrors?.Password,
        confirmPass: confirmPassword === password ? '' : SignupErrors?.ConfirmPassword,
      });

      const isValidInputs = email.trim() && ValidationHelper.isEmail(email) && password.trim() && confirmPassword.trim();

      // if(isValidInputs) {

      // }
    } catch {}
  };

  const borderErrorStyle = { border: '1px solid red' };

  return (
    <main>
      <section className='signup-section'>
        <img src={devlinksLogo} alt='devlinks' />
        <div className='signup-container'>
          <h1>Create account</h1>
          <p className='body-m'>Let's get you started sharing your links</p>
          <form onSubmit={handleSubmit}>
            <div className='input-group'>
              <label>
                <p className='body-s'>Email address</p>
              </label>
              <img src={emailIcon} alt='email icon' />
              <input ref={emailRef} type='email' placeholder='e.g. alex@email.com' style={errorMessages.email ? borderErrorStyle : {}} />
              {errorMessages?.email && <p className='body-s error'>{errorMessages?.email}</p>}
            </div>
            <div className='input-group'>
              <label>
                <p className='body-s'>Create password</p>
              </label>
              <img src={passwordIcon} alt='password icon' />
              <input ref={passwordRef} type='password' placeholder='At least 8 characters' style={errorMessages.password ? borderErrorStyle : {}} />
              {errorMessages?.password && <p className='body-s error'>{errorMessages?.password}</p>}
            </div>
            <div className='input-group'>
              <label>
                <p className='body-s'>Confirm password</p>
              </label>
              <img src={passwordIcon} alt='password icon' />
              <input ref={confirmPasswordRef} type='password' placeholder='At least 8 characters' style={errorMessages.confirmPass ? borderErrorStyle : {}} />
              {errorMessages?.confirmPass && <p className='body-s error'>{errorMessages?.confirmPass}</p>}
            </div>
            <p className='body-s'>Password must contain at least 8 characters</p>
            <button className='submit-btn'>Create new account</button>
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
