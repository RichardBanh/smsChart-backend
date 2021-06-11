import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { patientAdd } from "../../Fetch-cookie/patientListFetch";
import Cookies from "js-cookie";

export const PatientAdd = (props) => {
  const dr_id = Cookies.get("dr_id");
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [age, setAge] = useState("");
  const [blood_type, setBlood] = useState("");
  const [weight, setWeight] = useState("");
  const [latitude, setLat] = useState("");
  const [longitude, setLon] = useState("");
  const [phone_number, setPho] = useState("");
  const [height, setHei] = useState("");

  const [patientID, setpatientID] = useState("");

  const dispatch = useDispatch();
  return (
    <div className="modal">
      <div className="modal-content">
        <h4>Account Info</h4>
        <div className="modal-add-top">
          <div>
            <div className="modal-input-items">
              <div className="modal-input-items">First Name:</div>
              <input
                type="text"
                value={first_name}
                onChange={(e) => {
                  setFirst(e.target.value);
                }}
              />
            </div>
            <div className="modal-input-items">
              <div className="modal-input-items">Last Name:</div>
              <input
                type="text"
                value={last_name}
                onChange={(e) => {
                  setLast(e.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div className="modal-input-items">
              <div className="modal-input-items">Phone Number:</div>
              <input
                type="text"
                value={phone_number}
                onChange={(e) => {
                  setPho(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <h4>Patient Info</h4>
          <div className="modal-add-patient-info">
            <div>
              <div className="modal-input-items">Age: </div>
              <input
                type="number"
                name=""
                id=""
                className="modal-input-items"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
              />
              {/* <div className="modal-input-items">Gender: </div>
              <input type="text" name="" id="" className="modal-input-items" /> */}
              <div className="modal-input-items">Weight: </div>
              <input
                type="text"
                name=""
                id=""
                className="modal-input-items"
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
            </div>
            <div>
              <div className="modal-input-items">Height:</div>
              <input
                type="number"
                name=""
                id=""
                className="modal-input-items"
                value={height}
                onChange={(e) => {
                  setHei(e.target.value);
                }}
              />
              <div className="modal-input-items">Blood Type:</div>
              <input
                type="text"
                name=""
                id=""
                className="modal-input-items"
                value={blood_type}
                onChange={(e) => {
                  setBlood(e.target.value);
                }}
              />
              <div className="modal-input-items">Home Doctor: {dr_id}</div>
            </div>
          </div>
        </div>
        <button
          className="modal-button"
          onClick={(e) => {
            e.preventDefault();
            const data = {
              doctor_id: dr_id,
              first_name: first_name,
              last_name: last_name,
              age: age,
              blood_type: blood_type,
              weight: weight,
              phone_number: phone_number,
              height: height,
              patientName: first_name + " " + last_name,
            };
            patientAdd(data, dispatch);
            props.setAdd(false);
            //need to add dispatch to add chart to data
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            props.setAdd(false);
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};
