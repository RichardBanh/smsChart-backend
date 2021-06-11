import React from "react";

export const SingleNote = (props) => {
  return (
    <div className="singleNote">
      <div className="noteDate">{props.date}</div>
      <div className="notePar">{props.patientNote}</div>
      <div>Doctor#: {props.doctor_id}</div>
    </div>
  );
};
