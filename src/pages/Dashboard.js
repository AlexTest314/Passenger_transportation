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
      <div className="dashboard-container">
         <div className="element">
            <Sidebar signout={signout} />
         </div>
         <div className="main">
            <Main user={user} />
         </div>
      </div>
   );
};

export default Dashboard;
