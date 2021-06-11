import Cookies from "js-cookie";
import axios from "axios";

export const hivChart = async (patient_uuid, dispatch) => {
  const url = `http://127.0.0.1:8000/patients/${patient_uuid}/hiv_stats`;
  const jwt = Cookies.get("jwt");
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `JWT ${jwt}`,
      },
    });

    const val = parseInt(response.data.hiv_test) > 0 ? "1" : "0";

    dispatch({
      type: "UPDATE/HIV",
      payload: {
        hivtype: response.data.hiv_test,
        hivdiagnosisStage: response.data.hiv_test,
        hivpositive: val,
        hivtest:
          "Antibody Test Result: " +
          response.data.antibody_test_result +
          ", Nucleic Acid Test Result: " +
          response.data.nucleic_acid_test_result +
          ", CD4 Test Result: " +
          response.data.cd4_t_test_result +
          ", Antigen Test Result: " +
          response.data.antigen_test_result,
        hivtreatment: response.data.hivtreatment,
        hivmedication: response.data.medication,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const hivAdd = async (data, dispatch, patient_uuid) => {
  const url = `http://127.0.0.1:8000/patients/${patient_uuid}/hiv_stats`;
  const jwt = Cookies.get("jwt");
  try {
    const response = await axios.post(
      url,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `JWT ${jwt}`,
        },
      }
    );
    const val = parseInt(response.data.hiv_test) > 0 ? "1" : "0";
    dispatch({
      type: "UPDATE/HIV",
      payload: {
        hivtype: response.data.hiv_test,
        hivdiagnosisStage: response.data.hiv_test,
        hivpositive: val,
        hivtest:
          "Antibody Test Result: " +
          response.data.antibody_test_result +
          ", Nucleic Acid Test Result: " +
          response.data.nucleic_acid_test_result +
          ", CD4 Test Result: " +
          response.data.cd4_t_test_result +
          ", Antigen Test Result: " +
          response.data.antigen_test_result,
        hivtreatment: response.data.hivtreatment,
        hivmedication: response.data.medication,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
