import React, { useEffect, useState } from "react";
import { getData } from "../helpers/firebase-db";
import "../styles/users.css";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

const Users = () => {
   const [users, setUsers] = useState();
   console.log("users", users);
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
      <div className="users-container">
         {
            <div className="users-table">
               <TableHeader />

               {!users
                  ? null
                  : users.map((user) => {
                       return <TableRow user={user} key={user.id} />;
                    })}
            </div>
         }
      </div>
   );
};

export default Users;

