import React from "react";
import { BDiv } from "bootstrap-4-react";
import { Button } from "bootstrap-4-react/lib/components";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/firebase-config";

const Dashboard = ({ user, setUser, setLoggedIn }) => {
   const signout = async () => {
      await signOut(auth);
      setUser({});
      setLoggedIn(false);
   };
   return (
      <BDiv>
         <BDiv>{user.email}</BDiv>
         <Button className="btn-primary" onClick={signout}>
            Sign Out
         </Button>
      </BDiv>
   );
};

export default Dashboard;
