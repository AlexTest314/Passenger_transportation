import React, { useState } from "react";
import { Button } from "bootstrap-4-react/lib/components";
import "../styles/current-trip-row.css";
import { getData } from "../helpers/firebase-db";
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

  const edit = (trip) => {
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
                    if (index !== 5) {
                      return (
                        <div
                          className='trips-row-item'
                          key={key}>
                          {key}
                        </div>
                      );
                    }
                  })}
                  <Button
                    className='btn-warning pl-3 pt-1 mt-2 trips-table-edit-btn'
                    type='button'
                    onClick={() => edit(trip)}>
                    Edit
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
