import React, { useState, useEffect } from "react";
import { Patientbutton } from "../Components/patientbutton";
import { DOCTORPATIENTS } from "../Data/dumby";
import { useDispatch } from "react-redux";

export const Patientleftmenu = () => {
  const dispatch = useDispatch();
  const [dataPatient, setPatientData] = useState([]);
  const [selected, setSelected] = useState("all");
  useEffect(() => {
    setPatientData([...DOCTORPATIENTS]);
  }, []);

  const mapButtonPatient = dataPatient.map((x) => {
    const props = {
      patientName: x.patientName,
      patientID: x.patientID,
      id: x.id,
      dispatch: dispatch,
      selected: selected,
      setSelected: setSelected,
    };
    return <Patientbutton {...props} key={x.id} />;
  });
  return (
    <>
      <menu className="menuleftBox">
        <div className="labelPatient">Patients</div>
        <div className="scrollbox">
          {/* //map this section */}
          {mapButtonPatient}
          {/* //map this section */}
        </div>
        <div className="labelPatientAdd">+ Add Patients</div>
      </menu>
    </>
  );
};
