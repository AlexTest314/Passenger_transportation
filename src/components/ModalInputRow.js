import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getData } from "../helpers/firebase-db";
import "../styles/modal-input-row.css";

const ModalInputRow = ({ header, label, newTrip, setNewTrip, isEdit, changedTrip, setChangedTrip }) => {
  const [carNumbers, setCarNumbers] = useState([]);
  const [cities, setCities] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    const initsData = async () => {
      const data = await getData("trips", "initsData");
      const initsData = JSON.parse(data["initsData"]);
      setCarNumbers(initsData.carNumbers);
      setCities(initsData.cities);
      setDrivers(initsData.drivers);
    };
    initsData();
  }, []);

  const choosed = (index, header) => {
    const initArr = header === "carNumber" ? carNumbers : header === "driver" ? drivers : cities;

    isEdit ? setChangedTrip({ ...changedTrip, [header]: initArr[index] }) : setNewTrip({ ...newTrip, [header]: initArr[index] });
    setChosen(true);
  };
  return (
    <div
      key={header}
      className='input-row'>
      <div className='label'>{label}</div>

      <div className='input-wrapper'>
        <input
          type={header === "tp" ? "number" : "text"}
          name={header}
          id={header}
          value={isEdit ? changedTrip[header] : newTrip[header]}
          className='modal-input'
          onChange={(e) => (isEdit ? setChangedTrip({ ...changedTrip, [header]: e.target.value }) : setNewTrip({ ...newTrip, [header]: e.target.value }))}
          onFocus={() => setChosen(false)}
        />
        {!chosen ? (
          <ul className='list-of-elements'>
            {Object.values(header === "carNumber" ? carNumbers : header === "driver" ? drivers : cities).map((num, index) => {
              if (num.includes(isEdit ? changedTrip[header] : newTrip[header])) {
                return (
                  <li
                    key={index}
                    className='list-item'
                    onClick={() => choosed(index, header)}>
                    {num}
                  </li>
                );
              }
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ModalInputRow;
