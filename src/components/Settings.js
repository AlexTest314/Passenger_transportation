import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/settings.css";
import { auth } from "../helpers/firebase-config";
import { updatePassword } from "firebase/auth";
import { validatePass } from "../helpers/validatePass";

const firebaseErrors = {
   "Firebase: Error (auth/requires-recent-login).": "Recent login",
   "Firebase: Password should be at least 6 characters (auth/weak-password).":
      "Weak password",
};

const Settings = () => {
   const [newPassword, setNewPassword] = useState();
   const [similarPassword, setSimilarPassword] = useState();
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   const onSubmit = async (e) => {
      e.preventDefault();
      const user = auth.currentUser;

      const updatePassError = validatePass(newPassword, similarPassword);
      if (updatePassError) {
         setError(updatePassError);
         setSuccess("");
         return;
      }
      try {
         updatePassword(user, newPassword);
         setError("");
         setSuccess("Password was updated");
      } catch (error) {
         const updatePasswordError =
            firebaseErrors[error.message] || "Something went wrong";
         setError(updatePasswordError);
         setSuccess("");
      }
   };

   return (
      <Form onSubmit={onSubmit}>
         <div className="settings-container">
            <div className="settings-item">
               <label className="settings-item-label">New password</label>
               <input
                  className="settings-item-input"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  onChange={(e) => setNewPassword(e.target.value)}
               />
            </div>
            <div className="settings-item">
               <label className="settings-item-label">Repeat password</label>
               <input
                  className="settings-item-input"
                  id="checkPassword"
                  name="checkPassword"
                  type="password"
                  placeholder="Repeat password"
                  onChange={(e) => setSimilarPassword(e.target.value)}
               />
            </div>
            <div
               className={`settings-alert-${error ? "error" : "succ"}`}
               style={{ opacity: `${error || success ? "1" : "0"}` }}
            >
               {error ? error : success}
            </div>
            <Button primary className="settings-item-btn" type="submit">
               Update password
            </Button>
         </div>
      </Form>
   );
};

export default Settings;

