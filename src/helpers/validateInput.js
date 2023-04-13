export const loginInputValid = (users, email) => {
   const emailCheck = users.filter((user) => user.email === email);
   if (emailCheck.length === 0) return `Not found user: ${email}`;
   return null;
};
export const regInputValid = (users, email, password) => {
   const emailTest = /^\S+@\S+\.\S+$/;
   const moreSix = /.{6,}/g;
   const emailCheck = users.filter((user) => user.email === email);

   if (!emailTest.test(email)) return `Invalid email`;
   if (emailCheck.length > 0) return `Email: ${email} already in use`;
   if (!moreSix.test(password)) return `Password should be at least 6 characters`;
   return null;
};
