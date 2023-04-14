import React from "react";
import { Button } from "bootstrap-4-react/lib/components";
import "../styles/switcher-form.css";

const Switcher = ({ regForm, setRegForm }) => {
   return (
      <div className="switch-container">
         <Button
            type="button"
            className={` shadow-none mb-0 border-0 w-75 btn-round-left btn-${
               regForm ? "outline-" : ""
            }info`}
            active
            onClick={() => setRegForm(true)}
         >
            Registration
         </Button>
         <Button
            type="button"
            className={` shadow-none mb-0 border-0 w-75 btn-round-right btn-${
               regForm ? "" : "outline-"
            }info`}
            active
            onClick={() => setRegForm(false)}
         >
            Login
         </Button>
      </div>
   );
};

export default Switcher;

