import "./App.css";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Main } from "./Components/mainAppScreen";
import { login } from "./Redux/loginReducer";
import { patient } from "./Redux/patientClickReducer";
import { patientChart } from "./Redux/patientChartReducer";
import { patientList } from "./Redux/patientListReducer";
import { drappointments } from "./Redux/appointmentReducer";

// dont need yet... only when doing api call.. import thunk from "redux-thunk"

function App() {
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
}

const rootReducer = combineReducers({
  login,
  patient,
  patientChart,
  patientList,
  drappointments,
});

const store = createStore(rootReducer);
export default App;
