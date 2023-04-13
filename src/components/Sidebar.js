import React, { useState } from "react";
import "../styles/sidebar.css";
import { Button } from "bootstrap-4-react/lib/components";

import Settings from "../icons/sidebar-settings.svg";
import Profile from "../icons/sidebar-profile.svg";
import Arrow from "../icons/sidebar-arrow.svg";
import Trip from "../icons/trip.svg";
import LogOut from "../icons/sidebar-log-out.svg";

const Sidebar = ({ signout, user }) => {
   const [isOpen, setIsOpen] = useState(false);
   const [section, setSection] = useState("Trips");

   const hanleHumb = () => {
      setIsOpen(!isOpen);
   };
   return isOpen ? (
      <div className="sidebar-open">
         <div>
            <Button className="sidebar-btn rounded-0 w-100 shadow-none" type="button" onClick={hanleHumb}>
               <img src={Arrow} className="sidebar-icon" alt="arrow-icon" />
            </Button>
            <Button className={`shadow-none mb-0 border-0 rounded-0 w-100 sidebar-section ${section === "Trips" ? "selected" : ""}`} onClick={() => setSection("Trips")}>
               Trips
            </Button>
            <Button className={`shadow-none mb-0 border-0 rounded-0 w-100 sidebar-section ${section === "Profile" ? "selected" : ""}`} onClick={() => setSection("Profile")}>
               Profile
            </Button>
            <Button className={`shadow-none mb-0 border-0 rounded-0 w-100 sidebar-section ${section === "Security" ? "selected" : ""}`} onClick={() => setSection("Security")}>
               Security
            </Button>
         </div>
         <div className="user">{user.email}</div>
         <Button className="btn-primary sidebar-signout-btn" onClick={signout}>
            Sign Out
         </Button>
      </div>
   ) : (
      <div className="sidebar-close">
         <div>
            <Button type="button" className="sidebar-btn rounded-0 shadow-none border-0" onClick={hanleHumb}>
               <div className="sidebar-humburger-stick"></div>
               <div className="sidebar-humburger-stick"></div>
               <div className="sidebar-humburger-stick"></div>
            </Button>
            <Button className={`shadow-none mb-0 border-0 rounded-0 w-100 sidebar-section ${section === "Trips" ? "selected" : ""}`} onClick={() => setSection("Trips")}>
               <img src={Trip} className="sidebar-icon-close" alt="trip-icon" />
            </Button>
            <Button className={`shadow-none mb-0 border-0 rounded-0 w-100 sidebar-section ${section === "Profile" ? "selected" : ""}`} onClick={() => setSection("Profile")}>
               <img src={Profile} alt="profile-icon" />
            </Button>
            <Button className={`shadow-none mb-0 border-0 rounded-0 w-100 sidebar-section ${section === "Security" ? "selected" : ""}`} onClick={() => setSection("Security")}>
               <img src={Settings} alt="settings-icon" />
            </Button>
         </div>
         <Button className="btn-primary sidebar-signout-btn-close" onClick={signout}>
            <img src={LogOut} alt="logout-icon" />
         </Button>
      </div>
   );
};

export default Sidebar;