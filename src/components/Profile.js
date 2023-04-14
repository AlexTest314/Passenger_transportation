import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/profile.css";
import { createUpdateUserData } from "../helpers/firebase-db";

const initialUser = {
   uid: "",
   email: "",
   displayName: "",
   gender: "Male",
   age: "",
   phoneNumber: "",
};
const Profile = ({ user }) => {
   const [userInfo, setUserInfo] = useState(initialUser);
   const [success, setSuccess] = useState("");
   const [error, setError] = useState("");

   useEffect(() => {
      setUserInfo({
         ...userInfo,
         uid: user.uid,
         email: user.email,
      });
   }, [user]);

   const onSubmit = async (e) => {
      e.preventDefault();
      userInfo.displayName === ""
         ? setError("Name is empty")
         : userInfo.age === ""
         ? setError("Age is empty")
         : userInfo.phoneNumber === ""
         ? setError("Phone number is empty")
         : setSuccess("Your information was updated");

      createUpdateUserData(userInfo);
      if (success !== "") {
         setUserInfo({
            uid: user.uid,
            email: user.email,
            displayName: "",
            gender: "Male",
            age: "",
            phoneNumber: "",
         });
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
               <Form.Select
                  className="profile-item-input"
                  id="gender"
                  name="gender"
                  type="text"
                  value={userInfo.gender}
                  placeholder="Enter gender"
                  onChange={(e) =>
                     setUserInfo({ ...userInfo, gender: e.target.value })
                  }
               >
                  <option>Male</option>
                  <option>Female</option>
               </Form.Select>
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
               className={`security-alert-${error ? "error" : "succ"}`}
               style={{
                  opacity: `${error !== "" || success !== "" ? "1" : "0"}`,
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

