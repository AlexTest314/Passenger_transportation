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

const phoneCheck = async (phone) => {
  const userList = await getData("auth", "users");
  if (!userList) {
    return false;
  }

  const usersPhoneNumbers = Object.values(userList).map((user) => {
    const parsedUser = JSON.parse(user);
    const userPhoneNumber = parsedUser.phoneNumber;
    return userPhoneNumber;
  });

  const hasPhoneNumber = usersPhoneNumbers.some((userPhoneNumber) => userPhoneNumber === phone);

  return hasPhoneNumber;
};

export const loginEmailValid = async (email) => {
  const invalidEmail = await emailCheck(email);
  if (!invalidEmail) return `Not found user: ${email}`;
  return null;
};

export const loginPhoneValid = async (phone) => {
  const invalidPhone = await phoneCheck(phone);
  if (!invalidPhone) return `Not found phone number: ${phone}`;
  return null;
};

export const regInputValid = async (email, password) => {
  const emailTest = /^\S+@\S+\.\S+$/;
  const moreSix = /.{6,}/g;
  const invalidEmail = await emailCheck(email);

  if (!emailTest.test(email)) return `Invalid email`;
  if (invalidEmail) return `Email: ${email} already in use`;
  if (!moreSix.test(password)) return `Password should be at least 6 characters`;
  return null;
};
export const regPhoneValid = async (phone) => {
  const phoneTest = /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/;
  const invalidPhone = await phoneCheck(phone);

  if (!phoneTest.test(phone)) return `Invalid phone number`;
  if (invalidPhone) return `Phone number: ${phone} already in use`;
  return null;
};

export const modalInputValid = () => {};
