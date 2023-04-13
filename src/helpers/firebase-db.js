import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase-config";

async function addDB({ email, password }) {
   try {
      const docRef = await addDoc(collection(db, "auth/"), {
         email,
         password,
      });

      console.log("Document written with ID: ", docRef.id);
   } catch (e) {
      console.error("Error adding document: ", e);
   }
}
export default addDB;
