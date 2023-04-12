import React, { useEffect, useState } from "react";
import { BDiv } from "bootstrap-4-react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import { auth } from "../helpers/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Alert } from "bootstrap-4-react";
import checkPassword from "../helpers/checkPassword";
import checkEmail from "../helpers/checkEmail";

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
      <BDiv className="bg-info mx-auto w-25 rounded">
         <Switcher registration={registration} setRegistration={setRegistration} />
         <Form className="m-3 ">
            <Form.Group>
               <Form.Input
                  bg={registerEmail === "" ? "" : validEmail === true ? "success" : "danger"}
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                     setRegisterEmail(e.target.value);
                  }}
               />
               {registerEmail === "" ? null : validEmail === true ? null : <Alert danger>{validEmail.false}</Alert>}
            </Form.Group>
            <Form.Group>
               <Form.Input
                  bg={registerPassword === "" ? "" : validPass === true ? "success" : "danger"}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                     setRegisterPassword(e.target.value);
                  }}
               />
               {registerPassword === "" ? null : validPass === true ? null : <Alert danger>{validPass.false}</Alert>}
            </Form.Group>
            <Form.Group></Form.Group>
            <Button className="btn-primary w-100" type="button" onClick={register}>
               Sign Up
            </Button>
            {registered ? <Alert success>Your have already registered!</Alert> : null}
         </Form>
      </BDiv>
   );
};

export default RegistrationFrom;
