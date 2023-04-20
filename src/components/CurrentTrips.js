import React, { useState } from "react";
import { Button } from "bootstrap-4-react/lib/components";
import Edit from "../icons/table-row-edit.svg";
import Delete from "../icons/table-row-delete.svg";
import "../styles/current-trip-row.css";
import { deleteTripsData, getData } from "../helpers/firebase-db";
import { useEffect } from "react";

const CurrentTrips = ({ setIsEdit, setEditTrip }) => {
  const [trips, setTrips] = useState(false);

  useEffect(() => {
    const initsData = async () => {
      const data = await getData("trips", "tripsData");
      const trips = [];
      for (const key in data) {
        const tripInfo = JSON.parse(data[key]);
        const trip = { ...tripInfo };
        trip["id"] = key;
        trips.push(trip);
      }
      setTrips(trips);
    };
    initsData();
  }, []);

  const deleteTrip = (id) => {
    deleteTripsData(id);
  };

  const edit = (trip) => {
    console.log("trip", trip);
    setIsEdit(true);
    setEditTrip(trip);
  };
  return (
    <div className='trips-table-container'>
      {trips !== false
        ? trips.map((trip) => {
            return (
              <>
                <div
                  className='trips-table-row'
                  key={trip.id}>
                  {Object.values(trip).map((key, index) => {
                    return (
                      <>
                        {index !== 5 ? (
                          <div
                            className='trips-row-item'
                            key={key}>
                            {key}
                          </div>
                        ) : null}
                      </>
                    );
                  })}
                  <Button
                    className='btn-transparent pl-0 pt-1 mt-2 trips-table-btn'
                    type='button'
                    onClick={() => edit(trip)}>
                    <img
                      src={Edit}
                      className='table-row-icon'
                      alt='edit-trip-icon'
                    />
                  </Button>
                  <Button
                    className='btn-transparent pl-0 pt-1 mt-2 trips-table-btn'
                    type='button'
                    onClick={() => deleteTrip(trip.id)}>
                    <img
                      src={Delete}
                      className='table-row-icon'
                      alt='delete-trip-icon'
                    />
                  </Button>
                </div>
              </>
            );
          })
        : null}
    </div>
  );
};

export default CurrentTrips;
