import React, { useState } from "react";
import { Form, Button } from "bootstrap-4-react/lib/components";
import "../styles/modal.css";
import { tripsHeaders } from "../helpers/headerValues";
import { createInitialData, createTripsData, updateTripsData } from "../helpers/firebase-db";
import ModalInputRow from "./ModalInputRow";
import { validateModal } from "../helpers/validateModal";
import { v4 as uuid } from "uuid";
import { firebaseErrors } from "../helpers/firebaseErrors";

const Modal = ({ isAddTrip, setIsAddTrip, isEdit, setIsEdit, editTrip }) => {
  const [newTrip, setNewTrip] = useState({});
  const [changedTrip, setChangedTrip] = useState(editTrip);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const close = () => {
    setIsAddTrip ? setIsAddTrip(false) : setIsEdit(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const modalError = validateModal(isEdit ? changedTrip : newTrip);
    if (modalError) {
      setError(modalError);
      setSuccess("");
      return;
    }

    const tripId = uuid();
    newTrip["id"] = tripId;

    try {
      isEdit ? updateTripsData(changedTrip) : createTripsData(newTrip);
      createInitialData(newTrip);
    } catch (error) {
      const logFirebaseError = firebaseErrors[error.message] || "Something went wrong";
      setError(logFirebaseError);
      setSuccess("");
    }
    isEdit ? setIsEdit(false) : setIsAddTrip(false);
  };
  return (
    <div className='background'>
      <div className='modal-open'>
        <Form onSubmit={onSubmit}>
          <div className='add-header'>{setIsAddTrip ? "Create" : "Edit"}</div>

          {Object.keys(tripsHeaders).map((header) => (
            <ModalInputRow
              changedTrip={isEdit ? changedTrip : null}
              setChangedTrip={isEdit ? setChangedTrip : null}
              editTrip={isEdit ? editTrip : null}
              isEdit={isEdit ? isEdit : null}
              key={header}
              header={header}
              newTrip={newTrip}
              setNewTrip={setNewTrip}
              label={tripsHeaders[header]}
            />
          ))}
          <div
            className={`add-trip-alert-${error ? "error" : "succ"}`}
            style={{
              opacity: `${error || success ? "1" : "0"}`
            }}>
            {error ? error : success}
          </div>
          <div className='btn-container'>
            <Button
              className='btn-success mb-0 p-0 trips-agree-edit-btn'
              type='submit'>
              {setIsAddTrip ? "Create trip" : "Edit trip"}
            </Button>
            <Button
              className='btn-danger mb-0 p-0 trips-cancel-edit-btn'
              type='cancel'
              onClick={close}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Modal;
