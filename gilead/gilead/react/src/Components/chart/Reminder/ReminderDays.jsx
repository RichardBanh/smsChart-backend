import React, { useState, useEffect } from "react";

export const ReminderDays = (props) => {
  const [days, setDays] = useState([...props.days]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    setDays([...props.days]);
  }, [props.days]);

  return (
    <div className="modal-days-row">
      {edit ? (
        <div style={{ width: "60%" }}>
          <div>Which Days?</div>
          <div className="modal-form-datechecker">
            <div>
              <div>Mon</div>
              <input
                type="checkbox"
                value="Mon"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Mon");
                  days.includes("Mon") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Mon"]);
                }}
                checked={days.includes("Mon") === true ? true : false}
              />
            </div>
            <div>
              <div>Tue</div>
              <input
                type="checkbox"
                value="Tue"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Tue");
                  days.includes("Tue") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Tue"]);
                }}
                checked={days.includes("Tue") === true ? true : false}
              />
            </div>
            <div>
              <div>Wed</div>
              <input
                type="checkbox"
                value="Wed"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Wed");
                  days.includes("Wed") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Wed"]);
                }}
                checked={days.includes("Wed") === true ? true : false}
              />
            </div>
            <div>
              <div>Thu</div>
              <input
                type="checkbox"
                value="Thu"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Thu");
                  days.includes("Thu") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Thu"]);
                }}
                checked={days.includes("Thu") === true ? true : false}
              />
            </div>
            <div>
              <div>Fri</div>
              <input
                type="checkbox"
                value="Fri"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Fri");
                  days.includes("Fri") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Fri"]);
                }}
                checked={days.includes("Fri") === true ? true : false}
              />
            </div>
            <div>
              <div>Sat</div>
              <input
                type="checkbox"
                value="Sat"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Sat");
                  days.includes("Sat") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Sat"]);
                }}
                checked={days.includes("Sat") === true ? true : false}
              />
            </div>
            <div>
              <div>Sun</div>
              <input
                type="checkbox"
                value="Sun"
                onChange={() => {
                  const dayExclude = days.filter((x) => x !== "Sun");
                  days.includes("Sun") === true
                    ? setDays([...dayExclude])
                    : setDays([...days, "Sun"]);
                }}
                checked={days.includes("Sun") === true ? true : false}
              />
            </div>
          </div>
          <button onClick={() => setEdit(!edit)}>Close</button>
        </div>
      ) : (
        <div onClick={() => setEdit(!edit)}>
          <div>Days Sent</div>
          {days.map((b) => (
            <div className="modal-day">{b}</div>
          ))}
        </div>
      )}
    </div>
  );
};
