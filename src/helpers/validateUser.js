export const validateUser = (user) => {
   if (user.phoneNumber === "" || user.phoneNumber === null)
      return "Phone number is empty";
   if (user.displayName === "") return "Name is empty";
   if (user.age === "") return "Age is empty";
   return null;
};

