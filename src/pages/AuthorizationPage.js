import { BDiv } from "bootstrap-4-react";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationFrom from "../components/RegistrationFrom";

const AuthorizationPage = ({ setLoggedIn, setUser }) => {
   const [regForm, setRegForm] = useState(true);
   return (
      <BDiv className="d-flex flex-row justify-content-center align-items-center " style={{ height: "100vh" }}>
         {regForm ? <RegistrationFrom regForm={regForm} setRegForm={setRegForm} setLoggedIn={setLoggedIn} setUser={setUser} /> : <LoginForm regForm={regForm} setRegForm={setRegForm} setLoggedIn={setLoggedIn} setUser={setUser} />}
      </BDiv>
   );
};

export default AuthorizationPage;
