import React, { Component, useEffect, useState } from "react";
import { APPOINTMENTLIST } from "../../Data/dumby";
import { useDispatch, useSelector } from "react-redux";

import { SingleAppointment } from "./SingleAppointment";
import { Appointment } from "./Appointment";

export const AppointmentBase = (props) => {
  const dispatch = useDispatch();

  const drappointments = useSelector((state) => state.drappointments);
  return (
    <Appointment
      drappointments={drappointments}
      setshow={props.setshow}
      dispatch={dispatch}
    />
  );
};
