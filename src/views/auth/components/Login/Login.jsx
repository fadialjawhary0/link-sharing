import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginStyles.scss';

import devlinksLogo from '../../../../assets/logo-devlinks-large.svg';
import emailIcon from '../../../../assets/icon-email.svg';
import passwordIcon from '../../../../assets/icon-password.svg';

import { SignupErrors } from '../../../../constants';
import { ValidationHelper } from '../../../../helpers/validators';
import { AuthContext } from '../../../../contexts/auth.context';
import Button from '../../../../component/Button';

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useContext(AuthContext);

  const [errorMessages, setErrorMessages] = useState({ email: '', password: '', login: '' });
  const [loading, setLoading] = useState(false);

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
      password: password.trim() ? '' : SignupErrors?.Password,
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
        navigate('/');
      } catch (e) {
        e?.code === 'auth/invalid-credential'
          ? setErrorMessages({ ...errorMessages, login: 'Invalid email or password' })
          : setErrorMessages({ ...errorMessages, login: 'An error occurred. Please try again' });
      } finally {
        setLoading(false);
      }
    }
  };

  const borderErrorStyle = { border: '1px solid red' };

  return (
    <main className='main'>
      <section className='loginSection'>
        <img src={devlinksLogo} alt='devlinks' />
        <div className='loginContainer'>
          <h1>Login</h1>
          <p className='body-m'>Add your details below to get back into the app</p>
          <form className='login-form' onSubmit={handleSubmit}>
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
              <input ref={passwordRef} type='password' placeholder='Enter your password' style={errorMessages.password ? borderErrorStyle : {}} />
              {errorMessages?.password && <p className='body-s error'>{errorMessages?.password}</p>}
            </div>

            <Button loading={loading} text='Login' />
            <p className='body-m'>
              Don't have an account? <Link to='/signup'>Create account</Link>
            </p>
          </form>
          {errorMessages.login && <h3 className='body-s error authError'>{errorMessages.login}</h3>}
        </div>
      </section>
    </main>
  );
};

export default Login;
