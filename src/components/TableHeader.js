import React from "react";
import { usersHeaders } from "../helpers/headerValues";
import "../styles/table-header.css";

const TableHeader = () => {
  const headers = Object.values(usersHeaders);
  return (
    <div className='table-header'>
      {headers.map((header) => {
        return (
          <div
            className='table-header-item'
            key={header}>
            {header}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
