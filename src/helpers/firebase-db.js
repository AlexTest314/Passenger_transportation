import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getData = async (users) => {
   const usersCol = collection(db, users);
   const userSnapshot = await getDocs(usersCol);
   const userList = userSnapshot.docs.map((doc) => doc.data());

   return userList;
};

export const addData = async (user, pass) => {
   const email = user.email;
   const uid = user.uid;
   await setDoc(doc(db, "users", uid), {
      email,
      password: pass,
   });
};
