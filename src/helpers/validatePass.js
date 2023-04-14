export const validatePass = (pass1, pass2) => {
   const moreSix = /.{6,}/g;

   if (pass1 !== pass2) return "Your password are not similar";
   if (!moreSix.test(pass1)) return `Password should be at least 6 characters`;
   return null;
};

