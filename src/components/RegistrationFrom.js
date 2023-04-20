import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import Facebook from "../icons/facebook.svg";
import Google from "../icons/google.svg";
import { auth, providers } from "../helpers/firebase-config";
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "firebase/auth";
import "../styles/register-form.css";
import { createUpdateUserData } from "../helpers/firebase-db";
import { regInputValid, regPhoneValid } from "../helpers/validateInput";
import { firebaseErrors } from "../helpers/firebaseErrors";

const RegistrationFrom = ({ setLoggedIn, setUser, regForm, setRegForm }) => {
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
    const regError = await regPhoneValid(email, password, phoneNumber);
    if (regError) {
      setError(regError);
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
                className='code-alert-error'
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
              Sign Up
            </Button>
            <Button
              className='form-btn'
              type='button'
              onClick={() => setIsPhoneLogin(true)}>
              Sign Up with phone
            </Button>
          </Form>
          <Button
            className='form-btn'
            type='button'
            onClick={() => regWithProvider("google")}>
            <img
              src={Google}
              alt='google icon'
              className='form-btn-icon-google'
            />
            Sign Up with Google
          </Button>
          <Button
            className='form-btn'
            type='button'
            onClick={() => regWithProvider("facebook")}>
            <img
              src={Facebook}
              alt='facebook icon'
              className='form-btn-icon-fb'
            />
            Sign Up with Facebook
          </Button>
        </div>
      )}
    </div>
  );
};
export default RegistrationFrom;
