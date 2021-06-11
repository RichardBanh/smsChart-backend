import React, { useState, useEffect } from "react";

export const ReminderEvery = (props) => {
  const [when, setWhen] = useState(props.everyWhen);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setWhen(props.everyWhen);
  }, [props.everyWhen]);
  return (
    <>
      {edit ? (
        <form>
          <div>
            <div>Every Month?</div>
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="radio"
              value="Month"
              checked={when === "Month"}
              onChange={(e) => {
                setWhen(e.target.value);
              }}
            />
          </div>
          <div>
            <div>Every Second Month?</div>
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              type="radio"
              value="SMonth"
              checked={when === "SMonth"}
              onChange={(e) => {
                setWhen(e.target.value);
              }}
            />
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>Every Week?</div>
            <input
              type="radio"
              value="EWeek"
              onChange={(e) => {
                setWhen(e.target.value);
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              checked={when === "EWeek"}
            />
          </div>
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            close
          </button>
        </form>
      ) : (
        <div
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Every{" "}
          {when === "Month"
            ? "Month"
            : when === "SMonth"
            ? "Second Month"
            : when === "EWeek"
            ? "Week"
            : "N/A"}
        </div>
      )}
    </>
  );
};
