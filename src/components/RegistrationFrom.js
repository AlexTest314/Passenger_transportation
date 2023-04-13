import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import { auth } from "../helpers/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import checkPassword from "../helpers/checkPassword";
import checkEmail from "../helpers/checkEmail";
import "../styles/register-form.css";

const RegistrationFrom = ({ registration, setRegistration }) => {
   const [registerEmail, setRegisterEmail] = useState("");
   const [registerPassword, setRegisterPassword] = useState("");
   const [validPass, setValidPass] = useState(true);
   const [validEmail, setValidEmail] = useState(true);
   const [registered, setRegistered] = useState();

   useEffect(() => {
      const isValidEmail = checkEmail(registerEmail);
      const isValidPass = checkPassword(registerPassword);
      setValidEmail(isValidEmail);
      setValidPass(isValidPass);
   }, [registerPassword, registerEmail]);

   const register = async (e) => {
      e.preventDefault();

      try {
         const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
         if (user) setRegistered(true);
         console.log(user);
      } catch (error) {
         console.log(error.message);
      }

      setRegistration(false);
   };
   return (
      <div className="form-container">
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
            <div className="alert-error" style={{ opacity: `${registerEmail === "" ? "0" : validEmail === "0" ? "1" : "1"}` }}>
               {validEmail.false}
            </div>
            <input
               className={`form-input ${registerPassword === "" ? "" : validPass === true ? "valid" : "invalid"}`}
               type="password"
               placeholder="Password"
               onChange={(e) => {
                  setRegisterPassword(e.target.value);
               }}
            />
            <div className="alert-error" style={{ opacity: `${registerPassword === "" ? "0" : validPass === "0" ? "1" : "1"}` }}>
               {validPass.false}
            </div>
            {}
            <Button className="form-btn" type="button" onClick={register}>
               Sign Up
            </Button>
         </Form>
      </div>
   );
};

export default RegistrationFrom;
