import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { SingleAppointment } from "./SingleAppointment";
import { AddAppointments } from "./AppointmentAdd";

export const Appointment = (props) => {
  const dispatch = useDispatch();
  const [appointment, setappointment] = useState([...props.drappointments]);
  const [appointmentAdd, setAppointments] = useState(false);
  const callBackDel = (id) => {
    const newlist = appointment.filter((x) => x.id !== id);
    setappointment([...newlist]);
  };
  const callBackAdd = (data) => {
    setappointment([data, ...appointment]);
  };

  useEffect(() => {
    setappointment([...props.drappointments]);
  }, [props.drappointments]);
  return (
    <div className="modal">
      <div className="modal-content-appointment">
        <h3>Appointments</h3>
        {appointment.map((x) => (
          <SingleAppointment
            {...x}
            dispatch={dispatch}
            callBackDel={callBackDel}
          />
        ))}
        {appointmentAdd ? (
          <AddAppointments
            callBackAdd={callBackAdd}
            setAppointments={setAppointments}
            dispatch={props.dispatch}
          />
        ) : (
          ""
        )}
        <button
          onClick={() => {
            setAppointments(!appointmentAdd);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            props.setshow(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
