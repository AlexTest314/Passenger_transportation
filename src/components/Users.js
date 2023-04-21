import React, { useEffect, useState } from "react";
import { getData } from "../helpers/firebase-db";
import "../styles/users.css";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";

const Users = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    const usersData = async () => {
      const data = await getData("auth", "users");

      const users = Object.values(data).map((user) => {
        const parsedUser = JSON.parse(user);
        return parsedUser;
      });
      setUsers(users);
    };
    usersData();
  }, []);

  return (
    <div className='users-container'>
      {
        <div className='users-table'>
          <UsersTableHeader />
          <div className='users-table-container'>
            {!users
              ? null
              : users.map((user) => {
                  return (
                    <UsersTableRow
                      user={user}
                      key={user.id}
                    />
                  );
                })}
          </div>
        </div>
      }
    </div>
  );
};

export default Users;
