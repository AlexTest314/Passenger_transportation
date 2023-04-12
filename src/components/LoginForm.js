import React, { useEffect, useState } from "react";
import { BDiv } from "bootstrap-4-react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import { auth } from "../firebase-config";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({ setLoggedIn, registration, setRegistration }) => {
   const [loginEmail, setLoginEmail] = useState("");
   const [loginPassword, setLoginPassword] = useState("");

   useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
         if (currentUser) setLoggedIn(true);
      });
   }, [setLoggedIn]);

   const login = async (e) => {
      e.preventDefault();
      try {
         const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

         console.log(user);
      } catch (error) {
         console.log(error.message);
      }
      setLoggedIn(true);
   };
   return (
      <BDiv className="bg-info mx-auto w-25 rounded">
         <Switcher registration={registration} setRegistration={setRegistration} />
         <Form className="m-3 ">
            <Form.Group>
               <Form.Input
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                     setLoginEmail(e.target.value);
                  }}
               />
            </Form.Group>
            <Form.Group>
               <Form.Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                     setLoginPassword(e.target.value);
                  }}
               />
            </Form.Group>
            <Form.Group></Form.Group>
            <Button className="btn-primary w-100" type="button" onClick={login}>
               Log In
            </Button>
         </Form>
      </BDiv>
   );
};

export default LoginForm;
