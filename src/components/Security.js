import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/security.css";
import { auth } from "../helpers/firebase-config";
import { updatePassword } from "firebase/auth";

const firebaseErrors = {
   "Firebase: Error (auth/requires-recent-login).": "req error",
};

const Security = () => {
   const [newPassword, setNewPassword] = useState();
   const [similarPassword, setSimilarPassword] = useState();
   const [isUpdate, setIsUpdate] = useState(false);
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
   const onSubmit = async (e) => {
      e.preventDefault();
      const user = auth.currentUser;

      if (newPassword !== similarPassword) {
         setError("Your password are not similar");
         return;
      }
      updatePassword(user, newPassword)
         .then(() => {
            setError("");
            setSuccess("Password was updated");
            setIsUpdate(true);
         })
         .catch((error) => {
            console.log(error.message);
         });
   };
   return (
      <Form onSubmit={onSubmit}>
         <div className="security-container">
            <div className="security-item">
               <label className="security-item-label">New password</label>
               <input
                  className="security-item-input"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
               />
            </div>
            <div className="security-item">
               <label className="security-item-label">Repeat password</label>
               <input
                  className="security-item-input"
                  id="checkPassword"
                  name="checkPassword"
                  type="password"
                  placeholder="Repeat password"
                  onChange={(e) => setSimilarPassword(e.target.value)}
               />
            </div>
            <div
               className={`security-alert-${error ? "error" : "succ"}`}
               style={{ opacity: `${isUpdate !== "" ? "1" : "0"}` }}
            >
               {error ? error : success}
            </div>
            <Button primary className="security-item-btn" type="submit">
               Update password
            </Button>
         </div>
      </Form>
   );
};

export default Security;

