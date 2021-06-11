const initialState = {
  patientinfo: { age: "", height: "", gender: "", blood: "" },
  medicalChart: [{ date: "", note: "", signed: "" }],
  hiv: {
    hivtype: "",
    hivdiagnosisStage: "",
    hivpositive: "",
    hivtest: "",
    hivtreatment: "",
    hivmedication: "",
  },
  medication: "",
  diagnosis: "",
  reminder: [
    { message: "", startdate: "", times: [], days: [], everyWhen: "" },
  ],
};

//trouble maybe on the api side that combines the medical charts
//might be nice to have a search function for the medical chart

export const patientChart = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD/INITIAL":
      return { ...action.payload.all };
    case "ADD/UPDATE/CHART":
      return {
        ...state,
        medicalChart: [
          ...state.medicalChart,
          {
            date: action.payload.date,
            patientNote: action.payload.patientNote,
            doctor_id: action.payload.doctor_id,
          },
        ],
      };
    case "UPDATE/MEDICATION":
      return {
        ...state,
        medication: action.payload.medication,
      };
    case "UPDATE/DIAGNOSIS":
      return {
        ...state,
        diagnosis: action.payload.diagnosis,
      };
    case "UPDATE/HIV":
      return {
        ...state,
        hiv: {
          hivtype: action.payload.hivtype,
          hivdiagnosisStage: action.payload.hivdiagnosisStage,
          hivpositive: action.payload.hivpositive,
          hivtest: action.payload.hivtest,
          hivtreatment: action.payload.hivtreatment,
          hivmedication: action.payload.hivmedication,
        },
      };
    case "ADD/REMINDER":
      return {
        ...state,
        reminder: [
          ...state.reminder,
          {
            message: action.payload.message,
            startdate: action.payload.startdate,
            times: [action.payload.times],
            days: [action.payload.days],
            everyWhen: action.payload.everyWhen,
          },
        ],
      };
    case "LOAD/NOTES/ALL":
      return {
        ...state,
        medicalChart: [...action.payload.medicalChart],
      };
    default:
      return state;
  }
};
