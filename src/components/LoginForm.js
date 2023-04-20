import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import Facebook from "../icons/facebook.svg";
import Google from "../icons/google.svg";
import { getData } from "../helpers/firebase-db";
import { auth, providers } from "../helpers/firebase-config";
import { onAuthStateChanged, RecaptchaVerifier, signInWithEmailAndPassword, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import "../styles/login-form.css";
import { loginEmailValid, loginPhoneValid } from "../helpers/validateInput";
import { firebaseErrors } from "../helpers/firebaseErrors";

const LoginForm = ({ setLoggedIn, setUser, regForm, setRegForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const [isVerif, setIsVerif] = useState(false);
  const [verifCode, setVerifCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appVerifier, setAppVerifier] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPhoneLogin) {
      window.recaptchaVerifier = new RecaptchaVerifier("captcha", {}, auth);
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaWidgetId = widgetId;
      });
      setAppVerifier(window.recaptchaVerifier);
    }
  }, [isPhoneLogin]);

  const verif = (code) => {
    const confirmation = window.confirmationResult;
    confirmation
      .confirm(code)
      .then((result) => {
        const user = result.user;
        if (user) setLoggedIn(true);
      })
      .catch((error) => {
        const logFirebaseError = firebaseErrors[error.message] || "Something went wrong";
        setError(logFirebaseError);
      });
  };

  const sendSms = async () => {
    const logError = await loginPhoneValid(phoneNumber);
    if (logError) {
      setError(logError);
      return;
    }
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        if (confirmationResult) setIsVerif(true);
      })
      .catch((error) => {
        const logFirebaseError = firebaseErrors[error.message] || "Something went wrong";
        setError(logFirebaseError);
      });
  };

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

    const logError = await loginEmailValid(email);
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
      {isPhoneLogin ? (
        <>
          {isVerif ? (
            <div>
              <Switcher
                regForm={regForm}
                setRegForm={setRegForm}
              />
              <input
                className='form-input'
                id='code'
                name='code'
                type='code'
                placeholder='code'
                value={verifCode}
                onChange={(e) => {
                  setVerifCode(e.target.value);
                }}
              />

              <div
                className='alert-error'
                style={{ opacity: `${error !== "" ? "1" : "0"}` }}>
                {error}
              </div>

              <Button
                className='form-btn'
                type='button'
                onClick={() => verif(verifCode)}>
                Confirm
              </Button>
            </div>
          ) : (
            <div>
              <Switcher
                regForm={regForm}
                setRegForm={setRegForm}
              />
              <input
                className='form-input'
                id='phone'
                name='phone'
                type='phone'
                placeholder='Phone'
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              />
              <div
                id='captcha'
                className='captcha'></div>
              <div
                className='phone-alert-error'
                style={{ opacity: `${error !== "" ? "1" : "0"}` }}>
                {error}
              </div>

              <Button
                className='form-btn'
                type='button'
                onClick={sendSms}>
                Send Sms
              </Button>
            </div>
          )}
        </>
      ) : (
        <div>
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
            <Button
              className='form-btn'
              type='button'
              onClick={() => setIsPhoneLogin(true)}>
              Log In with phone
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
      )}
    </div>
  );
};

export default LoginForm;
