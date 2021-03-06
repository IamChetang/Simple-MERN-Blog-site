import React from 'react';
import { auth, provider } from '../firebase-configuration';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // used a local storage to ensure that user has login again and again
      //once logged in detail og Auth saved in local storage
      localStorage.setItem('isAuth', true);
      setIsAuth(true);
      navigate('/');
    });
  };

  return (
    <div className='loginPage'>
      <p>Sign In With Google to Continue</p>
      <button className='login-with-google-btn' onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
