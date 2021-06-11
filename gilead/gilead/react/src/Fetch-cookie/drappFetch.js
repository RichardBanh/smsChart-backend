import Cookies from "js-cookie";
import axios from "axios";

// const storeCookie = (resdata) => {
//   Cookies.set("jwt", resdata.token, { expires: 1 / 48 });
//   Cookies.set("username", resdata.user.username, { expires: 1 / 48 });
//   Cookies.set(
//     "dr_id",
//     resdata.user.username.charAt(resdata.user.username.length - 1),
//     { expires: 1 / 48 }
//   );
// };
export const drappointmentFetch = async (dispatch) => {
  const drid = Cookies.get("dr_id");
  const url = `http://127.0.0.1:8000/doctors/appointments/${drid}/`;
  const jwt = Cookies.get("jwt");

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `JWT ${jwt}`,
      },
    });
    const responseMap = response.data.map((x) => {
      return {
        id: x.uuid,
        patient: x.patient_name,
        appointmentTime: x.time,
        patientDate: x.date,
        phone: x.phone_number,
        duration: x.duration,
      };
    });
    dispatch({
      type: "LOAD/INITIAL/DRAPPOIN",
      payload: { all: [...responseMap] },
    });
  } catch (error) {
    console.error(error);
  }
};

export const appointmentAdd = async (dispatch, datarecieved) => {
  const drid = Cookies.get("dr_id");
  const url = `http://127.0.0.1:8000/doctors/appointments/${drid}/`;
  const jwt = Cookies.get("jwt");
  const data = { ...datarecieved, drid: drid };
  try {
    const response = await axios.post(
      url,
      { ...data },
      {
        headers: {
          Authorization: `JWT ${jwt}`,
        },
      }
    );
    // console.log(response);
    dispatch({
      type: "ADD/ONE/DRAPPOIN",
      payload: {
        appointment: {
          id: response.data.uuid,
          patient: response.data.patient_name,
          appointmentTime: response.data.time,
          patientDate: response.data.date,
          phone: response.data.phone_number,
          duration: response.data.duration,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};
