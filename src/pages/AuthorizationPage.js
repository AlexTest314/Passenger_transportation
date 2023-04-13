import { BDiv } from "bootstrap-4-react";
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegistrationFrom from "../components/RegistrationFrom";

const AuthorizationPage = ({ setLoggedIn, setUser }) => {
   const [registration, setRegistration] = useState(true);
   return (
      <BDiv className="d-flex flex-row justify-content-center align-items-center " style={{ height: "100vh" }}>
         {registration ? <RegistrationFrom registration={registration} setRegistration={setRegistration} /> : <LoginForm registration={registration} setRegistration={setRegistration} setLoggedIn={setLoggedIn} setUser={setUser} />}
      </BDiv>
   );
};

export default AuthorizationPage;
