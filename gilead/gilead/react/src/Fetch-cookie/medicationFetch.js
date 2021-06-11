import Cookies from "js-cookie";
import axios from "axios";

const joinFunc = async (obj) => {
  let arr = [];
  for (let key in obj.data) {
    if (obj.hasOwnProperty(key)) {
      arr.push(key + ": " + obj[key]);
    }
  }
  let result = arr.join(",");
  return result;
};

export const medicationFetch = async (patient_uuid, dispatch) => {
  const url = `http://127.0.0.1:8000/patients/${patient_uuid}/medication`;
  const jwt = Cookies.get("jwt");
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `JWT ${jwt}`,
      },
    });

    const result = joinFunc(response);
    dispatch({
      type: "UPDATE/MEDICATION",
      payload: { medication: result },
    });
  } catch (error) {
    console.error(error);
  }
};

export const medicationFetch = async (patient_uuid, dispatch, data) => {
  const url = `http://127.0.0.1:8000/patients/${patient_uuid}/medication`;
  const jwt = Cookies.get("jwt");

  const newMedObj = data.split(", ").reduce(function (obj, str, index) {
    let strParts = str.split(":");
    if (strParts[0] && strParts[1]) {
      obj[strParts[0].replace(/\s+/g, "")] = strParts[1].trim();
    }
    return obj;
  }, {});

  try {
    const response = await axios.post(
      url,
      { ...newMedObj },
      {
        headers: {
          Authorization: `JWT ${jwt}`,
        },
      }
    );

    const result = joinFunc(response);
    dispatch({
      type: "UPDATE/MEDICATION",
      payload: { medication: result },
    });
  } catch (error) {
    console.error(error);
  }
};
