import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/firebase-config";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

const Dashboard = ({ user, setLoggedIn }) => {
   const [section, setSection] = useState("Trips");
   const signout = async () => {
      await signOut(auth);
      setLoggedIn(false);
   };
   return (
      <div className="dashboard-container">
         <div className="element">
            <Sidebar
               signout={signout}
               section={section}
               setSection={setSection}
            />
         </div>
         <div className="main">
            <Main user={user} section={section} setSection={setSection} />
         </div>
      </div>
   );
};

export default Dashboard;

