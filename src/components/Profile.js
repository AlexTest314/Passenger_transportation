import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/profile.css";
import { createUpdateUserData } from "../helpers/firebase-db";
import { validateUser } from "../helpers/validateUser";

const firebaseErrors = {
   "Eror: Invalid user Id": "Invalid user Id",
};
const aditionalFields = {
   gender: "",
   age: "",
};
const Profile = ({ user }) => {
   const [userInfo, setUserInfo] = useState({ ...aditionalFields, ...user });
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");
   const onSubmit = async (e) => {
      e.preventDefault();
      console.log("userInfo", userInfo);
      const updateError = validateUser(userInfo);
      console.log("updateError", updateError);
      if (updateError) {
         setError(updateError);
         setSuccess("");
         return;
      }

      try {
         createUpdateUserData(userInfo);
         setError("");
         setSuccess("Your information was updated");
      } catch (error) {
         const updateFirebaseError =
            firebaseErrors[error.message] || "Something went wrong";
         setError(updateFirebaseError);
         setSuccess("");
      }
   };

   return (
      <Form onSubmit={onSubmit}>
         <div className="profile-container">
            <div className="profile-item">
               <label className="profile-item-label">Email</label>
               <input
                  className="profile-item-input"
                  id="email"
                  name="email"
                  type="email"
                  value={userInfo.email}
                  disabled
                  onChange={(e) =>
                     setUserInfo({ ...userInfo, email: e.target.value })
                  }
               />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Name</label>
               <input
                  className="profile-item-input"
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={userInfo.displayName}
                  placeholder="Enter name"
                  onChange={(e) =>
                     setUserInfo({ ...userInfo, displayName: e.target.value })
                  }
               />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Gender</label>
               <select
                  className="profile-item-input"
                  id="gender"
                  name="gender"
                  type="text"
                  value={userInfo.gender}
                  onChange={(e) =>
                     setUserInfo({ ...userInfo, gender: e.target.value })
                  }
               >
                  <option>Male</option>
                  <option>Female</option>
               </select>
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Age</label>
               <input
                  className="profile-item-input"
                  id="age"
                  name="age"
                  type="text"
                  value={userInfo.age}
                  placeholder={"Enter age"}
                  onChange={(e) =>
                     setUserInfo({ ...userInfo, age: e.target.value })
                  }
               />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Phone</label>
               <input
                  className="profile-item-input"
                  id="tel"
                  name="tel"
                  type="tel"
                  value={userInfo.phoneNumber}
                  placeholder="Enter phone number"
                  onChange={(e) =>
                     setUserInfo({ ...userInfo, phoneNumber: e.target.value })
                  }
               />
            </div>
            <div
               className={`profile-alert-${error ? "error" : "succ"}`}
               style={{
                  opacity: `${error || success ? "1" : "0"}`,
               }}
            >
               {error ? error : success}
            </div>
            <Button primary className="profile-item-btn" type="submit">
               Update information
            </Button>
         </div>
      </Form>
   );
};

export default Profile;

