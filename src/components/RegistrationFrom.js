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

const firebaseErrors = {
   "Firebase: Error (auth/missing-password).": "Missing password",
   "Firebase: Error (auth/email-already-in-use).": "Email already in use",
   "FirebaseError: Firebase: Error (auth/invalid-email).": "Invalid email",
};

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
            const regFirebaseError =
               firebaseErrors[error.message] || "Something went wrong";
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
         const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
         );
         createUpdateUserData(user.user);
         setUser(user.user);
         setLoggedIn(true);
      } catch (error) {
         const regFirebaseError =
            firebaseErrors[error.message] || "Something went wrong";
         setError(regFirebaseError);
      }
   };

   return (
      <div className="reg-form-container">
         <Switcher
            regForm={regForm}
            setRegForm={setRegForm}
            className="form-switcher"
         />
         <Form onSubmit={onSubmit}>
            <input
               className="reg-form-input"
               id="email"
               name="email"
               type="email"
               placeholder="Enter email"
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
            />
            <input
               className="reg-form-input"
               id="password"
               name="password"
               type="password"
               placeholder="Password"
               onChange={(e) => {
                  setPassword(e.target.value);
               }}
            />
            <div
               className="reg-alert-error"
               style={{ opacity: `${error !== "" ? "1" : "0"}` }}
            >
               {error}
            </div>
            <Button className="reg-form-btn" type="sumbit">
               Sign Up
            </Button>
            <Button
               className="form-btn"
               type="button"
               onClick={() => regWithProvider("google")}
            >
               <img
                  src={Google}
                  alt="google icon"
                  className="form-btn-icon-google"
               />
               Sign Up with Google
            </Button>
            <Button
               className="form-btn"
               type="button"
               onClick={() => regWithProvider("facebook")}
            >
               <img
                  src={Facebook}
                  alt="facebook icon"
                  className="form-btn-icon-fb"
               />
               Sign Up with Facebook
            </Button>
         </Form>
      </div>
   );
};

export default RegistrationFrom;

