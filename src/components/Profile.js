import React, { useEffect, useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/profile.css";
import { createUpdateUserData } from "../helpers/firebase-db";

const Profile = ({ user }) => {
   const [userInfo, setUserInfo] = useState({});

   useEffect(() => {
      setUserInfo({ ...userInfo, uid: user.uid, email: user.email });
   }, [user]);

   const onSubmit = async (e) => {
      e.preventDefault();
      createUpdateUserData(user);
   };

   return (
      <Form onSubmit={onSubmit}>
         <div className="profile-container">
            <div className="profile-item">
               <label className="profile-item-label">Name</label>
               <input className="profile-item-input" type="name" placeholder="Enter name" onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Phone</label>
               <input className="profile-item-input" type="phone" placeholder="Enter surname" onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })} />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Email</label>
               <input className="profile-item-input" type="surname" placeholder="Enter surname" disabled onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })} />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Gender</label>
               <Form.Select className="profile-item-input" type="option" placeholder="Enter gender" onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}>
                  <option>Male</option>
                  <option>Female</option>
               </Form.Select>
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Age</label>
               <input className="profile-item-input" type="text" placeholder={"Enter age"} onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })} />
            </div>

            <Button primary className="mb-3" type="submit">
               Update information
            </Button>
         </div>
      </Form>
   );
};

export default Profile;
