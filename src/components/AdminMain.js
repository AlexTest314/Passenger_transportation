import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Trips from "./Trips";
import Users from "./Users";

const AdminMain = ({ user, section, setLoggedIn }) => {
  return section === "Profile" ? <Profile user={user} /> : section === "Settings" ? <Settings /> : section === "Users" ? <Users user={user} /> : <Trips />;
};

export default AdminMain;
