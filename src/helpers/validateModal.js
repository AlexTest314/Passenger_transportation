export const validateModal = (trip) => {
  if (trip.carNumber === "" || !trip.hasOwnProperty("carNumber")) return "Car number is empty";
  if (trip.fromCity === "" || !trip.hasOwnProperty("fromCity")) return "From city is empty";
  if (trip.tp === "" || !trip.hasOwnProperty("tp")) return "Total passengers is empty";
  if (trip.toCity === "" || !trip.hasOwnProperty("toCity")) return "To city is empty";
  if (trip.driver === "" || !trip.hasOwnProperty("driver")) return "Driver is empty";
  return null;
};
