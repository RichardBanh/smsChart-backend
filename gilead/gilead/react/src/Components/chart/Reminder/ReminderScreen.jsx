import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ReminderMsg } from "./ReminderMsg";
import { ReminderTime } from "./ReminderTime";
import { ReminderDays } from "./ReminderDays";
import { ReminderEvery } from "./ReminderEvery";
export const ReminderScreen = (props) => {
  const dispatch = useDispatch();
  const [showReminderForm, setReminder] = useState(false);
  const [patientRemind, setpatientRemind] = useState([
    ...props.patientReminders,
  ]);
  const [when, setWhen] = useState("");
  const [days, setDays] = useState([]);
  const [msg, setMsg] = useState("");
  const [times, setTime] = useState([]);

  useEffect(() => {
    setpatientRemind(props.patientReminders);
  }, [props.patientReminders]);
  const currentRem = patientRemind.map((x) => (
    <div className="modal-map">
      <div className="modal-top">
        <ReminderMsg message={x.message} id={x.id} />
        <ReminderTime times={x.times} id={x.id} />
      </div>
      <div className="modal-bottom">
        <div className="modal-days">
          <ReminderDays days={x.days} id={x.id} />
        </div>
        <div className="modal-bottom-right">
          <ReminderEvery everyWhen={x.everyWhen} id={x.id} />
        </div>
      </div>
    </div>
  ));
  return (
    <>
      <div className="modal">
        <div class="modal-content">
          {showReminderForm ? (
            <form>
              <div className="modal-top">
                <div>
                  <div>Message?</div>
                  <input
                    type="text"
                    name=""
                    value={msg}
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <div>Times?</div>
                  <input
                    type="text"
                    value={times.join(", ")}
                    onChange={(e) => {
                      setTime([e.target.value]);
                    }}
                  />
                </div>
              </div>
              <div className="modal-formdateFreq">
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
                </div>
                <div className="modal-bottom-right">
                  <div>
                    <div>Every Month?</div>
                    <input
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
                  <div>
                    <div>Every Week?</div>
                    <input
                      type="radio"
                      value="EWeek"
                      onChange={(e) => {
                        setWhen(e.target.value);
                      }}
                      checked={when === "EWeek"}
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch({
                        type: "ADD/REMINDER",
                        payload: {
                          message: msg,
                          times: [times],
                          days: [days.join(" ")],
                          everyWhen: when,
                        },
                      });
                      setReminder(!showReminderForm);
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          ) : (
            ""
          )}
          {currentRem}
          <button
            className="modal-button-add"
            onClick={(e) => {
              e.preventDefault();
              setReminder(!showReminderForm);
            }}
          >
            Add Reminder
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.setPatientShowRem(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

// const [when, setWhen] = useState("");
//   const [days, setDays] = useState([]);
//   const [msg, setMsg] = useState("");
//   const [times, setTime] = useState([]);
