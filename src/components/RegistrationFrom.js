import React, { useState } from "react";
import { BDiv } from "bootstrap-4-react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import Switcher from "./Switcher";
import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const RegistrationFrom = ({ registration, setRegistration }) => {
   const [registerEmail, setRegisterEmail] = useState("");
   const [registerPassword, setRegisterPassword] = useState("");

   const register = async (e) => {
      e.preventDefault();

      try {
         const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
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
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => {
                     setRegisterEmail(e.target.value);
                  }}
               />
            </Form.Group>
            <Form.Group>
               <Form.Input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                     setRegisterPassword(e.target.value);
                  }}
               />
            </Form.Group>
            <Form.Group></Form.Group>
            <Button className="btn-primary w-100" type="button" onClick={register}>
               Sign Up
            </Button>
         </Form>
      </BDiv>
   );
};

export default RegistrationFrom;
