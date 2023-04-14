import { signOut } from "firebase/auth";
import React, { useState } from "react";
import "../styles/admin-panel.css";
import { auth } from "../helpers/firebase-config";
import AdminSidebar from "../components/AdminSidebar";
import AdminMain from "../components/AdminMain";

const AdminPanel = ({ user, setLoggedIn }) => {
   const [section, setSection] = useState("Users");
   const signout = async () => {
      await signOut(auth);
      setLoggedIn(false);
   };
   return (
      <div className="admin-panel-container">
         <div className="element">
            <AdminSidebar
               signout={signout}
               section={section}
               setSection={setSection}
            />
         </div>
         <div className="admin-main">
            <AdminMain user={user} section={section} setSection={setSection} />
         </div>
      </div>
   );
};

export default AdminPanel;

