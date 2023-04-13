import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import { auth } from "../helpers/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import checkPassword from "../helpers/checkPassword";
import checkEmail from "../helpers/checkEmail";
import "../styles/register-form.css";
import addDB from "../helpers/firebase-db";

const RegistrationFrom = ({ registration, setRegistration }) => {
   const [registerEmail, setRegisterEmail] = useState("");
   const [registerPassword, setRegisterPassword] = useState("");
   const [validPass, setValidPass] = useState(true);
   const [validEmail, setValidEmail] = useState(true);
   //const [registered, setRegistered] = useState();

   useEffect(() => {
      const isValidEmail = checkEmail(registerEmail);
      const isValidPass = checkPassword(registerPassword);
      setValidEmail(isValidEmail);
      setValidPass(isValidPass);
   }, [registerPassword, registerEmail]);

   const register = (e) => {
      e.preventDefault();
      addDB(registerEmail, registerPassword);
      try {
         createUserWithEmailAndPassword(auth, registerEmail, registerPassword).then((user) => {});

         // if (user) setRegistered(true);
      } catch (error) {
         console.log(error.message);
      }

      setRegistration(false);
   };
   return (
      <div className="reg-form-container">
         <Switcher registration={registration} setRegistration={setRegistration} className="form-switcher" />
         <Form>
            <input
               className={`reg-form-input ${registerEmail === "" ? "" : validEmail === true ? "valid" : "invalid"}`}
               type="email"
               placeholder="Enter email"
               onChange={(e) => {
                  setRegisterEmail(e.target.value);
               }}
            />
            <div className="reg-alert-error" style={{ opacity: `${registerEmail === "" ? "0" : validEmail === "0" ? "1" : "1"}` }}>
               {validEmail.false}
            </div>
            <input
               className={`reg-form-input ${registerPassword === "" ? "" : validPass === true ? "valid" : "invalid"}`}
               type="password"
               placeholder="Password"
               onChange={(e) => {
                  setRegisterPassword(e.target.value);
               }}
            />
            <div className="reg-alert-error" style={{ opacity: `${registerPassword === "" ? "0" : validPass === "0" ? "1" : "1"}` }}>
               {validPass.false}
            </div>
            {}
            <Button className="reg-form-btn" type="button" onKeyDown={(e) => (e.key === "Enter" ? register : null)} onClick={register}>
               Sign Up
            </Button>
         </Form>
      </div>
   );
};

export default RegistrationFrom;
