import React from "react";
import { BDiv } from "bootstrap-4-react";
import { Button } from "bootstrap-4-react/lib/components";

const Switcher = ({ registration, setRegistration }) => {
   return (
      <BDiv display="flex" justifyContent="around">
         <Button type="button" className={` shadow-none mb-0 border-0 w-75  btn-${registration ? "outline-" : ""}info`} active onClick={() => setRegistration(true)}>
            Registration
         </Button>
         <Button type="button" className={` shadow-none mb-0 border-0 w-75 btn-${registration ? "" : "outline-"}info`} active onClick={() => setRegistration(false)}>
            Login
         </Button>
      </BDiv>
   );
};

export default Switcher;
