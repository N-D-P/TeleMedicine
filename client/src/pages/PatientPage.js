import "./PatientPage.css";
import { useParams, Outlet } from 'react-router-dom';
import PatientSideNav from "./PatientSideNav";
import PatientTopNav from "./PatientTopNav";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchPatientInfo, sendAppointmentsData } from "../store/patientInfo-action";

export default function PatientPage() {
  const dispatch = useDispatch();
  const fullName = useSelector(state => state.patientInfo.name);
  const state = useSelector(state => state.patientInfo.state);
  const appointments = useSelector(state => state.patientInfo.appointments);
  const city = useSelector(state => state.patientInfo.city);
  const params = useParams();
  const { id: patientId } = params;

  useEffect(() => {
    dispatch(fetchPatientInfo(params.id));
  }, [dispatch]);

  useEffect(() => {
    if (appointments.changed) {
      dispatch(sendAppointmentsData(appointments, patientId));
    }
  }, [appointments, dispatch]);

  return (
    <div className="patientPage">
      <PatientSideNav id={patientId} fullName={fullName} state={state} city={city}/>
      <div className="patientContent">
        <PatientTopNav fullName={fullName}/>
        <Outlet />
      </div>
    </div>
  );
}
