import React, { useState, useEffect } from "react";

export const GeneralMedication = (props) => {
  const [medication, setMedication] = useState(props.patientMedication);
  const [showmedfield, setMedField] = useState(false);

  useEffect(() => {
    setMedication(props.patientMedication);
  }, [props.patientMedication]);
  return (
    <div
      className="medication"
      onClick={() => {
        setMedField(!showmedfield);
      }}
    >
      <div>Medication</div>
      {showmedfield ? (
        <textarea
          value={medication}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setMedication(e.target.value);
          }}
        ></textarea>
      ) : (
        <div>{medication}</div>
      )}
    </div>
  );
};
