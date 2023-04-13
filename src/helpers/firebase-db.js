import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getData = async (users) => {
   //const test = await getDoc(doc(db, "users", user.uid));
   //console.log(test);
   const usersCol = collection(db, users);
   const userSnapshot = await getDocs(usersCol);
   const userList = userSnapshot.docs.map((doc) => doc.data());

   return userList;
};

export const createUpdateUserData = async (user) => {
   await setDoc(doc(db, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
   });
};
