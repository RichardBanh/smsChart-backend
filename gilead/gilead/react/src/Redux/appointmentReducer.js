const initialState = [
  {
    id: "",
    patient: "",
    appointmentTime: "",
    patientDate: "",
    phone: "",
    duration: "",
  },
];

export const drappointments = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD/INITIAL/DRAPPOIN":
      return [...action.payload.all];
    case "UPDATE/ONE/DRAPPOIN":
      return state.map((x) => {
        if (x.id !== action.payload.updated.id) {
          return x;
        } else {
          return action.payload.updated;
        }
      });
    case "ADD/ONE/DRAPPOIN":
      return [...state, { ...action.payload.appointment }];
    case "DELETE/DRAPPOIN":
      return state.map((x) => {
        if (x.id !== action.payload.id) {
          return x;
        } else {
        }
      });
    default:
      return state;
  }
};
