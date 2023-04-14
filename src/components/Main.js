import React from "react";
import Profile from "./Profile";
import Security from "./Security";
import Trips from "./Trips";

const Main = ({ user, section }) => {
   return section === "Profile" ? (
      <Profile user={user} />
   ) : section === "Security" ? (
      <Security />
   ) : (
      <Trips />
   );
};

export default Main;

