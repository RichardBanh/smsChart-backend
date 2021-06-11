import React, { useState } from "react";
import { SingleNote } from "./SingleNote";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { sendNotes } from "../../Fetch-cookie/patientNotesFetch";
export const MedicalNotes = (props) => {
  const username = Cookies.get("username");
  const [showform, setShowForm] = useState(false);
  const [textvalue, setTextValue] = useState();
  const notesMap = props.patientNotes.map((x) => <SingleNote {...x} />);
  const dispatch = useDispatch();
  const drname = useSelector((state) => state.login.username);
  return (
    <div
      className="medicalnotes"
      onClick={() => {
        if (textvalue === "" || textvalue === null || textvalue === undefined) {
          setShowForm(!showform);
        }
      }}
    >
      {showform ? (
        <form
          action=""
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div>{props.date}</div>
          <textarea
            value={textvalue}
            onChange={(e) => {
              setTextValue(e.target.value);
            }}
          ></textarea>
          <button
            onClick={(e) => {
              e.preventDefault();
              sendNotes(
                {
                  doctor_id: props.doctor_id,
                  patient_uuid: props.patientId,
                  patientNote: textvalue,
                  date: props.date,
                },
                dispatch
              );
              setShowForm(false);
              setTextValue(null);
            }}
          >
            Submit
          </button>
        </form>
      ) : (
        <div></div>
      )}
      {notesMap}
    </div>
  );
};
