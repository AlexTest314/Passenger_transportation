import Button from "bootstrap-4-react/lib/components/Button";
import React, { useState } from "react";
import Agree from "../icons/users-edit-agree.svg";
import Cancel from "../icons/users-edit-cancel.svg";
import { createUpdateUserData } from "../helpers/firebase-db";
import "../styles/users-table-row.css";

const UsersTableRow = ({ user }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState({});

  const updateStatus = () => {
    const updateStatus = { ...user, ...status };
    createUpdateUserData(updateStatus);
    setIsEdit(false);
  };
  return (
    <div className='users-table-container'>
      <div className='users-table-row'>
        {Object.values(user).map((key, index) => {
          return (
            <>
              {index === 0 ? null : index === 6 ? (
                <div className='users-select-item'>
                  <select
                    className='users-table-select'
                    onChange={(e) => setStatus({ status: e.target.value })}
                    disabled={!isEdit ? true : false}>
                    <option>driver</option>
                    <option>passenger</option>
                    <option>controller</option>
                    <option value='custom'></option>
                  </select>
                  {isEdit ? (
                    <>
                      <Button
                        className='users-agree-edit-btn pl-1'
                        type='button'
                        onClick={updateStatus}>
                        <img
                          src={Agree}
                          className='users-edit-agree-icon'
                          alt='users-edit-agree-icon'
                        />
                      </Button>
                      <Button
                        className='users-cancel-edit-btn pl-0'
                        type='button'
                        onClick={() => setIsEdit(false)}>
                        <img
                          src={Cancel}
                          className='users-edit-cancel-icon'
                          alt='users-edit-cancel-icon'
                        />
                      </Button>
                    </>
                  ) : (
                    <Button
                      className='btn-warning users-edit-btn'
                      type='button'
                      onClick={() => setIsEdit(true)}>
                      Edit
                    </Button>
                  )}
                </div>
              ) : (
                <div
                  className='users-row-item '
                  key={key}>
                  {key}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default UsersTableRow;
