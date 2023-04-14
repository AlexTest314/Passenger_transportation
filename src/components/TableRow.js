import React, { useState } from "react";
import { createUpdateUserData } from "../helpers/firebase-db";
import "../styles/table-row.css";

const TableRow = ({ user }) => {
   const [isEdit, setIsEdit] = useState(false);
   const [status, setStatus] = useState({});

   const updateStatus = () => {
      const updateStatus = { ...user, ...status };
      createUpdateUserData(updateStatus);
      setIsEdit(false);
   };
   return (
      <div className="table-main">
         <div className="table-row">
            <div className="table-row-item">{user.displayName}</div>
            <div className="table-row-item">{user.phoneNumber}</div>
            <div className="table-row-item">{user.email}</div>
            <div className="table-row-item">{user.age}</div>
            <div className="table-row-item">{user.gender}</div>
            <div className="table-row-item">
               <select
                  className="table-select"
                  onChange={(e) => setStatus({ status: e.target.value })}
                  disabled={!isEdit ? true : false}
               >
                  <option>driver</option>
                  <option>passenger</option>
                  <option>controller</option>
               </select>
               {isEdit ? (
                  <>
                     <button
                        className="agree-edit-btn"
                        type="button"
                        onClick={updateStatus}
                     />
                     <button
                        className="cancel-edit-btn"
                        type="button"
                        onClick={() => setIsEdit(false)}
                     />
                  </>
               ) : (
                  <button type="button" onClick={() => setIsEdit(true)}>
                     Edit
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default TableRow;

