import React from "react";
import "../styles/trips-table-header.css";
import { Button } from "bootstrap-4-react/lib/components";
import { tripsHeaders } from "../helpers/headerValues";

const TripsTableHeader = ({ setIsAddTrip }) => {
  const headers = Object.values(tripsHeaders);

  return (
    <div className='trips-table-headers'>
      <div className='trips-table-header'>
        {headers.map((header) => {
          return (
            <div
              className='trips-table-header-item'
              key={header}>
              {header}
            </div>
          );
        })}
      </div>
      <Button
        className='btn-primary pt-1 trips-table-header-btn'
        type='button'
        onClick={() => setIsAddTrip(true)}>
        Add Trip
      </Button>
    </div>
  );
};

export default TripsTableHeader;
