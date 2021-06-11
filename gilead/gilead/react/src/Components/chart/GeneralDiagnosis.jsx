import React, { useState, useEffect } from "react";

export const GeneralDiagnosis = (props) => {
  const [diagnosis, setDiagnosis] = useState(props.patientDiagnosis);
  const [showmedfield, setMedField] = useState(false);

  useEffect(() => {
    setDiagnosis(props.patientDiagnosis);
  }, [props.patientDiagnosis]);
  return (
    <div
      className="diagnosis"
      onClick={() => {
        setMedField(!showmedfield);
      }}
    >
      <div>Diagnosis</div>
      {showmedfield ? (
        <textarea
          value={diagnosis}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            setDiagnosis(e.target.value);
          }}
        ></textarea>
      ) : (
        <div>{diagnosis}</div>
      )}
    </div>
  );
};
