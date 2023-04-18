import React from "react";
import { useState } from "react";
import "../styles/trips-table-row.css";
import CurrentTrips from "./CurrentTrips";
import Modal from "./Modal";

const TripsTableRow = ({ isAddTrip, setIsAddTrip }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTrip, setEditTrip] = useState({});

  return (
    <div className='trips-table-main'>
      {isAddTrip ? (
        <Modal
          setIsAddTrip={setIsAddTrip}
          isAddTrip={isAddTrip}
        />
      ) : isEdit ? (
        <Modal
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          editTrip={editTrip}
        />
      ) : (
        <CurrentTrips
          setIsEdit={setIsEdit}
          setEditTrip={setEditTrip}
        />
      )}
    </div>
  );
};

export default TripsTableRow;
