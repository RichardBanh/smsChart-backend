import React, { useState, useEffect } from "react";
import { Patientbutton } from "./patientbutton";
import { useDispatch, useSelector } from "react-redux";
import { PatientAdd } from "./PatientAdd";
import { patientFetch } from "../../Fetch-cookie/patientListFetch";

export const Patientleftmenu = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("all");
  const docPatient = useSelector((state) => state.patientList);
  useEffect(() => {
    patientFetch(dispatch, "PATIENT/LIST/LOADALL");
  }, []);
  const [addPatient, setAdd] = useState(false);

  const mapButtonPatient = docPatient.map((x) => {
    const props = {
      patientName: x.first_name + " " + x.last_name,
      patientID: x.uuid,
      patientPhone: x.phone_number,
      id: x.uuid,
      dispatch: dispatch,
      selected: selected,
      setSelected: setSelected,
    };

    return <Patientbutton {...props} key={x.uuid} />;
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
        <div
          className="labelPatientAdd"
          onClick={() => {
            setAdd(!addPatient);
          }}
        >
          + Add Patients
        </div>
      </menu>
      {addPatient ? <PatientAdd setAdd={setAdd} /> : ""}
    </>
  );
};
