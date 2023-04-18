import React, { useState } from "react";
import "../styles/trips.css";
import TripsTableHeader from "./TripsTableHeader";
import TripsTableRow from "./TripsTableRow";

const Trips = () => {
  const [isAddTrip, setIsAddTrip] = useState(false);

  return (
    <div className='trips-container'>
      {
        <div className='trips-table'>
          <TripsTableHeader
            isAddTrip={isAddTrip}
            setIsAddTrip={setIsAddTrip}
          />
          <TripsTableRow
            isAddTrip={isAddTrip}
            setIsAddTrip={setIsAddTrip}
          />
        </div>
      }
    </div>
  );
};

export default Trips;
