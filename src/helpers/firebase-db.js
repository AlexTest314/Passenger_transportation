import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export const getData = async (auth, users) => {
  const userSnapshot = await getDoc(doc(db, auth, users));

  return userSnapshot.data();
};

export const createUpdateUserData = async (userInfo) => {
  const usersFromDb = await getData("auth", "users");

  if (userInfo.id === undefined) {
    userInfo.id = userInfo.uid;
  }

  if (userInfo.displayName === null) {
    userInfo.displayName = userInfo.email.substring(0, userInfo.email.indexOf("@"));
  }

  const user = {
    id: userInfo.id,
    displayName: userInfo.displayName,
    email: userInfo.email,
    phoneNumber: userInfo.phoneNumber,
    gender: userInfo.gender || "",
    age: userInfo.age || "",
    status: userInfo.status || ""
  };

  const usersToDb = { ...usersFromDb };
  usersToDb[userInfo.id] = JSON.stringify(user);
  await setDoc(doc(db, "auth", "users"), usersToDb);
};

export const createUpdateTripsData = async (tripInfo) => {
  const tripsFromDb = await getData("trips", "tripsData");

  const trip = {
    carNumber: tripInfo.carNumber,
    fromCity: tripInfo.fromCity,
    toCity: tripInfo.toCity,
    tp: tripInfo.tp,
    driver: tripInfo.driver
  };

  const tripsToDb = { ...tripsFromDb };
  tripsToDb[tripInfo.id] = JSON.stringify(trip);
  await setDoc(doc(db, "trips", "tripsData"), tripsToDb);
};

export const deleteTripsData = async (id) => {
  const tripsFromDb = await getData("trips", "tripsData");

  delete tripsFromDb[id];
  const tripsToDb = { ...tripsFromDb };
  await setDoc(doc(db, "trips", "tripsData"), tripsToDb);
};

export const createInitialData = async (initInfo) => {
  const initsFromDb = await getData("trips", "initsData");
  let initsData;
  if (initsFromDb === undefined) {
    initsData = {
      carNumbers: [initInfo.carNumber],
      cities: [initInfo.fromCity],
      drivers: [initInfo.driver]
    };
  } else {
    const parsedInitsFromDb = JSON.parse(initsFromDb["initsData"]);

    for (const key in parsedInitsFromDb) {
      if (key === "carNumbers") {
        const foundCarNumber = parsedInitsFromDb[key].some((carNumber) => carNumber === initInfo.carNumber);
        if (foundCarNumber === false) parsedInitsFromDb[key].push(initInfo.carNumber);
      }
      if (key === "cities") {
        const foundStartCity = parsedInitsFromDb[key].some((city) => city === initInfo.fromCity);
        if (foundStartCity === false) parsedInitsFromDb[key].push(initInfo.fromCity);
        const foundEndCity = parsedInitsFromDb[key].some((city) => city === initInfo.toCity);
        if (foundEndCity === false) parsedInitsFromDb[key].push(initInfo.toCity);
      }
      if (key === "drivers") {
        const foundDriver = parsedInitsFromDb[key].some((driver) => driver === initInfo.driver);
        if (foundDriver === false) parsedInitsFromDb[key].push(initInfo.driver);
      }
    }
    initsData = parsedInitsFromDb;
  }

  const initsToDb = {};
  initsToDb["initsData"] = JSON.stringify(initsData);
  await setDoc(doc(db, "trips", "initsData"), initsToDb);
};
