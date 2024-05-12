
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function SignInPage() {
  const navigate = useNavigate();
  const auth = getAuth();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {

        console.log(result);
        navigate('/home'); 
      })
      .catch((error) => {
     
        console.error('Error during sign in:', error);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <h1>Sign In</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}

export default SignInPage;