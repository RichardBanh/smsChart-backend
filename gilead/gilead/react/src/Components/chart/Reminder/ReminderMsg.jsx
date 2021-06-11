import React, { useState, useEffect } from "react";

export const ReminderMsg = (props) => {
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState(props.message);

  useEffect(() => {
    setMsg(props.message);
  }, [props.message]);
  return (
    <>
      {edit ? (
        <>
          <input
            type="text"
            name=""
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            Close
          </button>
        </>
      ) : (
        <div onClick={() => setEdit(!edit)}>
          Message: <div>{props.message}</div>
        </div>
      )}
    </>
  );
};
