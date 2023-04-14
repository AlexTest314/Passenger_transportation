import { getData } from "./firebase-db";

const emailCheck = async (email) => {
   const userList = await getData("auth", "users");
   if (!userList) {
      return false;
   }

   const usersEmails = Object.values(userList).map((user) => {
      const parsedUser = JSON.parse(user);
      const userEmail = parsedUser.email;
      return userEmail;
   });

   const hasEmail = usersEmails.some((userEmail) => userEmail === email);

   return hasEmail;
};

export const loginInputValid = async (email) => {
   const invalidEmail = await emailCheck(email);
   if (!invalidEmail) return `Not found user: ${email}`;
   return null;
};

export const regInputValid = async (email, password) => {
   const emailTest = /^\S+@\S+\.\S+$/;
   const moreSix = /.{6,}/g;
   const invalidEmail = await emailCheck(email);

   if (!emailTest.test(email)) return `Invalid email`;
   if (invalidEmail) return `Email: ${email} already in use`;
   if (!moreSix.test(password))
      return `Password should be at least 6 characters`;
   return null;
};

