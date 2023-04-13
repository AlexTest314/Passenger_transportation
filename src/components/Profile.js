import React from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/profile.css";

const Profile = () => {
   return (
      <Form>
         <div className="profile-container">
            <div className="profile-item">
               <label className="profile-item-label">Name</label>
               <input className="profile-item-input" type="name" placeholder="Enter name" />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Surname</label>
               <input className="profile-item-input" type="birthday" placeholder="Enter surname" />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Gender</label>
               <Form.Select className="profile-item-input" type="gender" placeholder="Enter gender">
                  <option>Male</option>
                  <option>Female</option>
               </Form.Select>
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Email</label>
               <input className="profile-item-input" type="email" placeholder="Enter email" />
            </div>
            <div className="profile-item">
               <label className="profile-item-label">Phone</label>
               <input className="profile-item-input" type="email" placeholder="Enter phone" />
            </div>
            <Button primary className="mb-3">
               Update information
            </Button>
         </div>
      </Form>
   );
};

export default Profile;
