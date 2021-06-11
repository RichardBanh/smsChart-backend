const initialState = [
  {
    first_name: "",
    last_name: "",
    uuid: "",
    age: "",
    blood_type: "",
    lat: "",
    lon: "",
    phone_number: "",
    doctor_id: "",
    weight: "",
    registration_date: "",
  },
];

export const patientList = (state = initialState, action) => {
  switch (action.type) {
    case "PATIENT/LIST/LOADALL":
      return [...action.payload.all];
    case "PATIENT/LIST/ADD":
      return [
        ...state,
        {
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          uuid: action.payload.uuid,
          age: action.payload.age,
          weight: action.payload.weight,
          height: action.payload.height,
          doctor_id: action.payload.doctor_id,
          blood_type: action.payload.blood_type,
          lat: action.payload.lat,
          lon: action.payload.lon,
          phone_number: action.payload.phone_number,
          registration_date: action.payload.registration_date,
        },
      ];
    default:
      return state;
  }
};
