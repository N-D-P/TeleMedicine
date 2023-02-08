import { configureStore } from "@reduxjs/toolkit";
import DoctorInfoSliceReducer from "./doctorInfoSlice";
import AppointmentsSliceReducer from "./appointmentsSlice";
import PatientInfoSliceReducer from "./patientInfoSlice";

const store = configureStore({
  reducer: {doctorInfo: DoctorInfoSliceReducer, appointmentInfo: AppointmentsSliceReducer, patientInfo: PatientInfoSliceReducer},
});

export default store;

