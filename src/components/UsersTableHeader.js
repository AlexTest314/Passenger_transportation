import React from "react";
import { usersHeaders } from "../helpers/headerValues";
import "../styles/users-table-header.css";

const UsersTableHeader = () => {
  const headers = Object.values(usersHeaders);
  return (
    <div className='users-table-header'>
      {headers.map((header) => {
        return (
          <div
            className='users-table-header-item'
            key={header}>
            {header}
          </div>
        );
      })}
    </div>
  );
};

export default UsersTableHeader;
