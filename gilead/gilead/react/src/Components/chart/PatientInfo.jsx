import React, { useState, useEffect } from "react";

export const PatientInfo = (props) => {
  const [patientInfo, setPatientInfo] = useState(props);
  const [changeAge, setChangeA] = useState(false);

  // const [changeGender, setChangeG] = useState(false);
  const [changeWeight, setChangeW] = useState(false);
  const [changeHeight, setChangeH] = useState(false);
  const [changeDr, setChangeD] = useState(false);

  useEffect(() => {
    setPatientInfo(props);
  }, [props]);

  return (
    <div
      className="patientinfo"
      onClick={() => {
        // setChangeG(false);
        setChangeA(false);
        setChangeD(false);
        setChangeW(false);
        setChangeH(false);
      }}
    >
      <div className="tabblock">
        <div>Patient Info</div>
        {changeAge ? (
          <input
            value={patientInfo.age}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) =>
              setPatientInfo({ ...patientInfo, age: e.target.value })
            }
          />
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setChangeA(!changeAge);
            }}
          >
            Age: {patientInfo.age}
          </div>
        )}
        {/* {changeGender ? (
          <input
            value={patientInfo.gender}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) =>
              setPatientInfo({
                ...patientInfo,
                gender: e.target.value,
              })
            }
          />
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setChangeG(!changeGender);
            }}
          >
            Gender: {patientInfo.gender}
          </div>
        )} */}
        {changeWeight ? (
          <input
            value={patientInfo.weight}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) =>
              setPatientInfo({
                ...patientInfo,
                weight: e.target.value,
              })
            }
          />
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setChangeW(!changeWeight);
            }}
          >
            Weight: {patientInfo.weight}
          </div>
        )}
        {changeHeight ? (
          <input
            value={patientInfo.height}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) =>
              setPatientInfo({
                ...patientInfo,
                height: e.target.value,
              })
            }
          />
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setChangeH(!changeHeight);
            }}
          >
            Height: {patientInfo.height}
          </div>
        )}

        <div>Blood Type: {patientInfo.blood_type} </div>
        {changeDr ? (
          <input
            value={patientInfo.doctor_id}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) =>
              setPatientInfo({
                ...patientInfo,
                doctor_id: e.target.value,
              })
            }
          />
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setChangeD(!changeDr);
            }}
          >
            Home Doctor ID: {patientInfo.doctor_id}
          </div>
        )}
      </div>
      <div>
        <div>Account Creation Date: {patientInfo.registration_date}</div>
      </div>
    </div>
  );
};
