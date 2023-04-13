import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/firebase-config";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const Dashboard = ({ user, setUser, setLoggedIn }) => {
   const signout = async () => {
      await signOut(auth);
      setUser({});
      setLoggedIn(false);
   };
   return (
      <div>
         <Sidebar signout={signout} user={user} />
         <Main />
      </div>
   );
};

export default Dashboard;
