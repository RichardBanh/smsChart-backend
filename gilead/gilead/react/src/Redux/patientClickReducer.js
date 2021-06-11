const initialState = { patientName: "", patientID: "", patientPhone: "" };

export const patient = (state = initialState, action) => {
  switch (action.type) {
    case "CLICK/LEFT/PATIENT":
      return {
        patientName: action.payload.patientName,
        patientID: action.payload.patientID,
        patientPhone: action.payload.patientPhone,
      };
    default:
      return state;
  }
};
