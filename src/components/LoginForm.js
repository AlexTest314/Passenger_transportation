import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Facebook from "../icons/facebook.svg";
import Google from "../icons/google.svg";
import Switcher from "./Switcher";
import { getData } from "../helpers/firebase-db";
import { auth, providers } from "../helpers/firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../styles/login-form.css";
import { loginInputValid } from "../helpers/validateInput";
import { firebaseErrors } from "../helpers/firebaseErrors";

const LoginForm = ({ setLoggedIn, setUser, regForm, setRegForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginWithProvider = (providerName) => {
    signInWithPopup(auth, providers[providerName])
      .then((result) => {
        setLoggedIn(true);
      })
      .catch((error) => {
        const logFirebaseError = firebaseErrors[error.message] || "Something went wrong";
        setError(logFirebaseError);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const id = currentUser.uid;
        const data = await getData("auth", "users");
        const user = JSON.parse(data[id]);
        setUser(user);
      }

      if (currentUser) setLoggedIn(true);
    });
  }, [setLoggedIn, setUser]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const logError = await loginInputValid(email);
    if (logError) {
      setError(logError);
      return;
    }
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUser(user.user);
      setLoggedIn(true);
    } catch (error) {
      const logFirebaseError = firebaseErrors[error.message] || "Something went wrong";
      setError(logFirebaseError);
    }
  };
  return (
    <div className='form-container'>
      <Switcher
        regForm={regForm}
        setRegForm={setRegForm}
      />
      <Form onSubmit={onSubmit}>
        <input
          className='form-input'
          id='email'
          name='email'
          type='email'
          placeholder='Enter email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className='form-input'
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div
          className='alert-error'
          style={{ opacity: `${error !== "" ? "1" : "0"}` }}>
          {error}
        </div>

        <Button
          className='form-btn'
          type='submit'>
          Log In
        </Button>
      </Form>
      <Button
        className='form-btn'
        type='button'
        onClick={() => loginWithProvider("google")}>
        <img
          src={Google}
          alt='google icon'
          className='form-btn-icon-google'
        />
        Log In with Google
      </Button>
      <Button
        className='form-btn'
        type='button'
        onClick={() => loginWithProvider("facebook")}>
        <img
          src={Facebook}
          alt='facebook icon'
          className='form-btn-icon-fb'
        />
        Log In with Facebook
      </Button>
    </div>
  );
};

export default LoginForm;
