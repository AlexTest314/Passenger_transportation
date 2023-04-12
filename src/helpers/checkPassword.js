const checkPassword = (pass) => {
   const low = /[a-z]/g;
   const upper = /[A-Z]/g;
   const num = /[0-9]/g;
   const symbol = /[!@#$%^&*]/g;
   const moreEight = /.{8,}/g;

   return low.test(pass) === false ? { false: "The string must contain at least 1 lowercase alphabetical character" } : upper.test(pass) === false ? { false: "The string must contain at least 1 uppercase alphabetical character" } : num.test(pass) === false ? { false: "The string must contain at least 1 numeric character" } : symbol.test(pass) === false ? { false: "The string must contain at least one special character" } : moreEight.test(pass) === false ? { false: "The string must be eight characters or longer" } : true;
};

export default checkPassword;
