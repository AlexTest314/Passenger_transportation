import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import { auth, providerFacebook, providerGoogle } from "../helpers/firebase-config";
import { GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import "../styles/login-form.css";

const LoginForm = ({ setLoggedIn, setUser, registration, setRegistration }) => {
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
   //const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
   const [invalidLogin, setInvalidLogin] = useState("");

   const loginWithGoogle = () => {
      signInWithPopup(auth, providerGoogle)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
         });
   };
   const loginWithFacebook = () => {
      signInWithPopup(auth, providerFacebook)
         .then((result) => {
            // The signed-in user info.
            const user = result.user;
            setUser(user);

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // IdP data available using getAdditionalUserInfo(result)
            // ...
         })
         .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
         });
   };

   const loginWithPhone = () => {
      /* const phoneNumber = loginPhoneNumber;
      const appVerifier = recaptcha;

      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
         .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
         })
         .catch((error) => {
            // Error; SMS not sent
            // ...
         }); */
   };
   useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
         if (currentUser) setLoggedIn(true);
         setUser(currentUser);
      });
   }, [setLoggedIn, setUser]);

   const login = async (e) => {
      e.preventDefault();
      try {
         const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

         console.log(user);
      } catch (error) {
         return error.message === "Firebase: Error (auth/invalid-email)." ? setInvalidLogin("Invalid email") : error.message === "Firebase: Error (auth/user-not-found)." ? setInvalidLogin("User not found") : error.message === "Firebase: Error (auth/wrong-password)." ? setInvalidLogin("Wrong password") : "";

         console.log(error.message);
      }
   };
   return (
      <div className="form-container">
         <Switcher registration={registration} setRegistration={setRegistration} />
         <Form>
            <input
               className="form-input"
               type="email"
               placeholder="Enter email"
               onChange={(e) => {
                  setLoginEmail(e.target.value);
               }}
            />
            <input
               className="form-input"
               type="password"
               placeholder="Password"
               onChange={(e) => {
                  setLoginPassword(e.target.value);
               }}
            />
            <div className="alert-error" style={{ opacity: `${invalidLogin !== "" ? "1" : "0"}` }}>
               {invalidLogin}
            </div>

            <Button className="form-btn" type="button" onClick={login}>
               Log In
            </Button>
            <Button className="form-btn" type="button" onClick={loginWithGoogle}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px" className="form-btn-icon-google">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  <path d="M1 1h22v22H1z" fill="none" />
               </svg>
               Log In with Google
            </Button>
            <Button className="form-btn" type="button" onClick={loginWithFacebook}>
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="form-btn-icon-fb">
                  <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z" />
                  <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z" />
               </svg>
               Log In with Facebook
            </Button>
         </Form>
      </div>
   );
};

export default LoginForm;
