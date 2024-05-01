import React, { useState } from 'react';
import axios from 'axios';
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import './Register.css';



const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // const firebaseConfig = {
  //   apiKey: import.meta.env.VITE_API_KEY,
  //   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  //   projectId: import.meta.env.VITE_PROJECT_ID,
  //   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  //   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  //   appId: import.meta.env.VITE_APP_ID,
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyDhnTKB-oidp0KEX8Nb9o06vhDX_rbEV0M",
    authDomain: "bloomtest-2996c.firebaseapp.com",
    projectId: "bloomtest-2996c",
    storageBucket: "bloomtest-2996c.appspot.com",
    messagingSenderId: "998308923768",
    appId: "1:998308923768:web:a68bd745423423ca1b608d",
  };
  
  
  const app = initializeApp(firebaseConfig);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      //    Send ID token to backend
      const idToken = await result.user.getIdToken();
      console.log(idToken);
      const response = await fetch("https://be.eliteplay.bloombyte.dev/user/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken }),
      });

      // Handle response from backend
      const data = await response.json();
      console.log(data);
      localStorage.setItem("accessToken", data);
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!username.match(/^[a-zA-Z0-9_]+$/)) {
      setError('Username must not contain special characters.');
      setIsLoading(false);
      return;
    } else {
      setError('');
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    } else {
      setEmail(email.toLowerCase())
      setError('');
    }

    if (!validatePassword(password)) {
      setError(
        'Password must be at least 8 characters long and include at least one number and one special character.'
      );
      setIsLoading(false);
      return;
    } else {
      setError('');
    }

    if (!termsChecked) {
      setError('You must agree to the terms and conditions.');
      setIsLoading(false);
      return;
    } else {
      setError('');
    }

    try {
      const response = await axios.post(
        'https://be.eliteplay.bloombyte.dev/user/auth/signup',
        {
          username,
          email,
          password,
          referralCode: referralCode,
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setError(error.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-auth">
      <div className="register">
        <div className="register-logo">
          <img src="./auth-img.png" alt="logo" />
        </div>
        <div className="register-form">
          <div className="register-form__heading">
            <h4>Sign Up</h4>
          </div>
          <div className="register-form__form">
            <form className="register-form__form-input" onSubmit={handleSubmit}>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src={
                    !usernameFocused && username
                      ? './user-white.svg'
                      : './user.svg'
                  }
                  alt="user-icon"
                />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={handleUsernameChange}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                />
              </div>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src={
                    !emailFocused && email
                      ? './mail-white.svg'
                      : './mail-02.svg'
                  }
                  alt="email-icon"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
              </div>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src={
                    !passwordFocused && password
                      ? './lock-key-white.svg'
                      : './lock-key.svg'
                  }
                  alt="password-icon"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
              </div>
              <div className="register-form__input-box">
                <img
                  className="input-icon"
                  src="./gift.svg"
                  alt="reward-icon"
                />
                <input
                  type="text"
                  placeholder="Referral Code"
                  value={referralCode}
                  onChange={(event) => {
                    setReferralCode(event.target.value);
                  }}
                />
              </div>
              <div className="register-form__check-box">
                <label className="container">
                  I agree to the User Agreement & confirm I am at least 18 years
                  old
                  <input
                    checked={termsChecked}
                    onChange={(e) => setTermsChecked(e.target.checked)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <button className="register-form__submit-btn" type="submit">
                {isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : 'Sign Up Now'}
              </button>
              {message && <p className="success-msg">{message}</p>}
              {error && <p className="error-msg">{error}</p>}
            </form>

            <div className="register-form__signin">
              <p>
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </div>
            <div className="register-form__option-box">
              <p className="register-form__option">or</p>
            </div>

            <div onClick={signInWithGoogle} className="register-form__google-signin">
              <img src="./google.svg" alt="google-icon" />
              <span>Sign Up with google</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
