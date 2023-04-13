import React from "react";
import { Button } from "bootstrap-4-react/lib/components";
import "../styles/switcher-form.css";

const Switcher = ({ registration, setRegistration }) => {
   return (
      <div className="switch-container">
         <Button type="button" className={` shadow-none mb-0 border-0 w-75 btn-round-left btn-${registration ? "outline-" : ""}info`} active onClick={() => setRegistration(true)}>
            Registration
         </Button>
         <Button type="button" className={` shadow-none mb-0 border-0 w-75 btn-round-right btn-${registration ? "" : "outline-"}info`} active onClick={() => setRegistration(false)}>
            Login
         </Button>
      </div>
   );
};

export default Switcher;
