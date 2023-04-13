export const authEmailPath = (users, email, password) => {
   const emailCheck = users.filter((user) => user.email === email);
   const passCheck = emailCheck.filter((user) => user.password === password);
   if (emailCheck.length === 0) return `Not found user: ${email}`;
   if (passCheck.length === 0) return `Incorect password`;
   return;
};
