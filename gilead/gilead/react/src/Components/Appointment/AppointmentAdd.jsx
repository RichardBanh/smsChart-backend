import React, { Component, useState } from "react";
import { appointmentAdd } from "../../Fetch-cookie/drappFetch";

export const AddAppointments = (props) => {
  const [name, setname] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [phone, setphone] = useState("");
  const [duration, setduration] = useState("");
  return (
    <div className="singleAppointment">
      <input
        type="text"
        value={name}
        placeholder="Name"
        onChange={(e) => {
          setname(e.target.value);
        }}
        className="single-appointment-item"
      />
      <input
        type="text"
        placeholder="Date YYYY-MM-DD"
        value={date}
        onChange={(e) => {
          setdate(e.target.value);
        }}
        className="single-appointment-item"
      />
      <input
        type="text"
        placeholder="Time"
        value={time}
        onChange={(e) => {
          settime(e.target.value);
        }}
        className="single-appointment-item"
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => {
          setphone(e.target.value);
        }}
        className="single-appointment-item"
      />
      <input
        type="text"
        placeholder="Duration"
        value={duration}
        onChange={(e) => {
          setduration(e.target.value);
        }}
        className="single-appointment-item"
      />
      <button
        onClick={() => {
          props.setAppointments(false);
        }}
      >
        Cancel
      </button>
      <button
        onClick={() => {
          const data = {
            patient_name: name,
            date,
            time,
            phone_number: phone,
            duration,
          };
          props.setAppointments(false);
          appointmentAdd(props.dispatch, data);
        }}
      >
        Submit
      </button>
    </div>
  );
};
