import React, { useState, useEffect } from "react";

export const ReminderTime = (props) => {
  const [edit, setEdit] = useState(false);
  const [times, setTime] = useState([props.times]);

  useEffect(() => {
    setTime([props.times]);
  }, [props.times]);
  return (
    <>
      {edit ? (
        <>
          <input
            type="text"
            value={times.join(", ")}
            onChange={(e) => {
              setTime([e.target.value]);
            }}
          />
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          ></button>
        </>
      ) : (
        <div
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Times Sent:
          {times.map((a) => (
            <div>{a}</div>
          ))}
        </div>
      )}
    </>
  );
};
