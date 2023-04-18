const checkEmail = (email) => {
   const test = /^\S+@\S+\.\S+$/;

   return test.test(email) === false
      ? { false: "Example: firstname.lastname@example.com" }
      : true;
};

export default checkEmail;
