import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

//probably not the right way to do this... need to revise

export const SingleAppointment = (props) => {
  const [edit, setEdit] = useState(false);
  const [patientApp, setpatientApp] = useState({ ...props });
  useEffect(() => {
    setpatientApp({ ...props });
  }, [props]);
  return (
    <div className="singleAppointment">
      <div className="single-appointment-item">{patientApp.patient}</div>
      <div className="single-appointment-item">
        Date: <br />
        {edit ? (
          <input
            type="text"
            value={patientApp.patientDate}
            onChange={(e) => {
              setpatientApp({ ...patientApp, patientDate: e.target.value });
            }}
          />
        ) : (
          patientApp.patientDate
        )}
      </div>
      <div className="single-appointment-item">
        Time: <br />
        {edit ? (
          <input
            type="text"
            value={patientApp.appointmentTime}
            onChange={(e) => {
              setpatientApp({ ...patientApp, appointmentTime: e.target.value });
            }}
          />
        ) : (
          patientApp.appointmentTime
        )}
      </div>
      <div className="single-appointment-item">
        Phone: <br />
        {edit ? (
          <input
            type="text"
            value={patientApp.phone}
            onChange={(e) => {
              setpatientApp({ ...patientApp, phone: e.target.value });
            }}
          />
        ) : (
          patientApp.phone
        )}
      </div>
      <div className="single-appointment-item">
        Duration: <br />
        {edit ? (
          <input
            type="text"
            value={patientApp.duration}
            onChange={(e) => {
              setpatientApp({ ...patientApp, duration: e.target.value });
            }}
          />
        ) : (
          patientApp.duration
        )}
      </div>
      <button
        onClick={() => {
          props.callBackDel(patientApp.id);
        }}
      >
        Delete
      </button>
      {edit ? (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Submit
        </button>
      ) : (
        <button
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
};
