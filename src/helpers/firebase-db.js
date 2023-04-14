import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getData = async (auth, users) => {
   const userSnapshot = await getDoc(doc(db, auth, users));

   return userSnapshot.data();
};

export const createUpdateUserData = async (userInfo) => {
   const usersFromDb = await getData("auth", "users");
   if (usersFromDb) {
      const checkUserId = usersFromDb[userInfo.id];
      if (!checkUserId) {
         throw new Error("Invalid user Id");
      }
   }
   if (userInfo.id === undefined) {
      userInfo.id = userInfo.uid;
   }

   const user = {
      id: userInfo.id,
      displayName: userInfo.displayName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      gender: userInfo.gender || "",
      age: userInfo.age || "",
      status: userInfo.status || "",
   };

   const usersToDb = { ...usersFromDb };
   usersToDb[userInfo.id] = JSON.stringify(user);
   await setDoc(doc(db, "auth", "users"), usersToDb);
};

