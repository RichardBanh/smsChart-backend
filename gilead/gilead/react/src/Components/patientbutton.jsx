import React, { Component, useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const Patientbutton = (props) => {
  //this needs to be put into the main chart
  return (
    <div
      className="patientBox"
      style={{ opacity: props.selected === props.id ? 0.6 : 1 }}
      id={props.id}
      onClick={() => {
        props.dispatch({
          type: "CLICK/LEFT/PATIENT",
          payload: {
            patientName: props.patientName,
            patientID: props.patientID,
          },
        });
        props.setSelected(props.id);
      }}
    >
      <div className="patientText">{props.patientName}</div>
    </div>
  );
};
