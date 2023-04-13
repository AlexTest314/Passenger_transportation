import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Facebook from "../icons/facebook.svg";
import Google from "../icons/google.svg";
import Switcher from "./Switcher";
import { addData, getData } from "../helpers/firebase-db";
import { auth, providerFacebook, providerGoogle } from "../helpers/firebase-config";
import { GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../styles/login-form.css";
import { authEmailPath } from "../helpers/authEmailPass";

const LoginForm = ({ setLoggedIn, setUser, registration, setRegistration }) => {
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");
   const [invalidLogin, setInvalidLogin] = useState("");

   const loginWithGoogle = () => {
      signInWithPopup(auth, providerGoogle)
         .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            setUser(user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
         })
         .catch((error) => {
            /* // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ... */
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
            /*   // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ... */
         });
   };

   useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
         if (currentUser) setLoggedIn(true);
         setUser(currentUser);
         addData(currentUser);
      });
   }, [setLoggedIn, setUser]);

   const login = async (e) => {
      e.preventDefault();

      const userList = await getData("users");
      const authCheck = authEmailPath(userList, loginEmail, loginPassword);
      authCheck !== undefined ? setInvalidLogin(authCheck) : setLoggedIn(true);
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
               <img src={Google} alt="google icon" className="form-btn-icon-google" />
               Log In with Google
            </Button>
            <Button className="form-btn" type="button" onClick={loginWithFacebook}>
               <img src={Facebook} alt="facebook icon" className="form-btn-icon-fb" />
               Log In with Facebook
            </Button>
         </Form>
      </div>
   );
};

export default LoginForm;
