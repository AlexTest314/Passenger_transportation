import { signOut } from "firebase/auth";
import React from "react";
import { BDiv } from "bootstrap-4-react";
import { auth } from "../helpers/firebase-config";
import { Button } from "bootstrap-4-react/lib/components";

const AdminPanel = ({ user, setLoggedIn, setUser }) => {
   auth
      .getUsers([{ uid: "uid1" }, { email: "user2@example.com" }, { phoneNumber: "+15555550003" }, { providerId: "google.com", providerUid: "google_uid4" }])
      .then((getUsersResult) => {
         console.log("Successfully fetched user data:");
         getUsersResult.users.forEach((userRecord) => {
            console.log(userRecord);
         });

         console.log("Unable to find users corresponding to these identifiers:");
         getUsersResult.notFound.forEach((userIdentifier) => {
            console.log(userIdentifier);
         });
      })
      .catch((error) => {
         console.log("Error fetching user data:", error);
      });
   const signout = async () => {
      await signOut(auth);
      setUser({});
      setLoggedIn(false);
   };
   return (
      <BDiv>
         <BDiv>{user.email}</BDiv>
         <Button className="btn-primary" onClick={signout}>
            Sign Out
         </Button>
      </BDiv>
   );
};

export default AdminPanel;
