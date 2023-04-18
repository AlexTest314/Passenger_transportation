import React from "react";
import Profile from "./Profile";
import Settings from "./Settings";
import Trips from "./Trips";

const Main = ({ user, section }) => {
  return section === "Profile" ? <Profile user={user} /> : section === "Settings" ? <Settings /> : <Trips />;
};

export default Main;
