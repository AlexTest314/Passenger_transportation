import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import Facebook from "../icons/facebook.svg";
import Google from "../icons/google.svg";
import { auth, providers } from "../helpers/firebase-config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../styles/register-form.css";
import { createUpdateUserData } from "../helpers/firebase-db";
import { regInputValid } from "../helpers/validateInput";
import { firebaseErrors } from "../helpers/firebaseErrors";

const RegistrationFrom = ({ setLoggedIn, setUser, regForm, setRegForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const regWithProvider = (providerName) => {
    signInWithPopup(auth, providers[providerName])
      .then((result) => {
        createUpdateUserData(result.user);
        setLoggedIn(true);
      })
      .catch((error) => {
        const regFirebaseError = firebaseErrors[error.message] || "Something went wrong";
        setError(regFirebaseError);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const regError = await regInputValid(email, password);
    if (regError) {
      setError(regError);
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      createUpdateUserData(user.user);
      setUser(user.user);
      setLoggedIn(true);
    } catch (error) {
      const regFirebaseError = firebaseErrors[error.message] || "Something went wrong";
      setError(regFirebaseError);
    }
  };

  return (
    <div className='reg-form-container'>
      <Switcher
        regForm={regForm}
        setRegForm={setRegForm}
        className='form-switcher'
      />
      <Form onSubmit={onSubmit}>
        <input
          className='reg-form-input'
          id='email'
          name='email'
          type='email'
          placeholder='Enter email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className='reg-form-input'
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div
          className='reg-alert-error'
          style={{ opacity: `${error !== "" ? "1" : "0"}` }}>
          {error}
        </div>

        <Button
          className='reg-form-btn'
          type='sumbit'>
          Sign Up
        </Button>
        <div className='social-btns'>
          Sign Up with:
          <Button
            className='m-0 ml-3  p-0 border-0 reg-form-btn-icon'
            type='button'
            onClick={() => regWithProvider("google")}>
            <img
              src={Google}
              alt='google icon'
              className='reg-form-btn-icon-google'
            />
          </Button>
          <Button
            className='m-0  ml-3 p-0 border-0 reg-form-btn-icon'
            type='button'
            onClick={() => regWithProvider("facebook")}>
            <img
              src={Facebook}
              alt='facebook icon'
              className='reg-form-btn-icon-fb'
            />
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default RegistrationFrom;
