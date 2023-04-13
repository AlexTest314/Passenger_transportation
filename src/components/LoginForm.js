import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Facebook from "../icons/facebook.svg";
import Google from "../icons/google.svg";
import Switcher from "./Switcher";
import { createUpdateUserData, getData } from "../helpers/firebase-db";
import { auth, db, providerFacebook, providerGoogle } from "../helpers/firebase-config";
import { GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "../styles/login-form.css";
import { loginInputValid } from "../helpers/validateInput";
import { doc, setDoc } from "firebase/firestore";

const firebaseErrors = {
   "Firebase: Error (auth/missing-password).": "Missing password",
   "Firebase: Error (auth/wrong-password).": "Wrong password",
   "FirebaseError: Firebase: Error (auth/invalid-email).": "Invalid email",
};

const LoginForm = ({ setLoggedIn, setUser, regForm, setRegForm }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const loginWithGoogle = () => {
      signInWithPopup(auth, providerGoogle)
         .then((result) => {
            createUpdateUserData(result.user);
            setLoggedIn(true);
         })
         .catch((error) => {
            console.log(error.code);
            console.log(error.message);
         });
   };
   const loginWithFacebook = () => {
      signInWithPopup(auth, providerFacebook)
         .then((result) => {
            createUpdateUserData(result.user);
            setLoggedIn(true);
         })
         .catch((error) => {
            console.log(error.code);
            console.log(error.message);
         });
   };

   useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
         //setUser(currentUser);
         //addData(currentUser);
      });
   }, [setLoggedIn, setUser]);

   const onSubmit = async (e) => {
      e.preventDefault();

      const userList = await getData("users");
      const logError = loginInputValid(userList, email);
      if (logError) {
         setError(logError);
         return;
      }
      try {
         const user = await signInWithEmailAndPassword(auth, email, password);
         setUser(user.user);
         setLoggedIn(true);
      } catch (error) {
         const regFirebaseError = firebaseErrors[error.message] || "Something went wrong";
         setError(regFirebaseError);
      }
   };
   return (
      <div className="form-container">
         <Switcher regForm={regForm} setRegForm={setRegForm} />
         <Form onSubmit={onSubmit}>
            <input
               className="form-input"
               id="email"
               name="email"
               type="email"
               placeholder="Enter email"
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
            />
            <input
               className="form-input"
               id="password"
               name="password"
               type="password"
               placeholder="Password"
               onChange={(e) => {
                  setPassword(e.target.value);
               }}
            />
            <div className="alert-error" style={{ opacity: `${error !== "" ? "1" : "0"}` }}>
               {error}
            </div>

            <Button className="form-btn" type="submit">
               Log In
            </Button>
         </Form>
         <Button className="form-btn" type="button" onClick={loginWithGoogle}>
            <img src={Google} alt="google icon" className="form-btn-icon-google" />
            Log In with Google
         </Button>
         <Button className="form-btn" type="button" onClick={loginWithFacebook}>
            <img src={Facebook} alt="facebook icon" className="form-btn-icon-fb" />
            Log In with Facebook
         </Button>
      </div>
   );
};

export default LoginForm;
