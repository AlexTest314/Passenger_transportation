import React from "react";
import "../styles/table-header.css";

const tableHeaders = {
   displayName: "Name",
   phoneNumber: "Phone number",
   email: "Email",
   age: "Age",
   gender: "Gender",
   status: "Status",
};
const TableHeader = () => {
   const headers = Object.values(tableHeaders);
   return (
      <div className="table-header">
         {headers.map((header) => {
            return (
               <div className="table-header-item" key={header}>
                  {header}
               </div>
            );
         })}
      </div>
   );
};

export default TableHeader;

