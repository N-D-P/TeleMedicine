import "./DoctorPage.css";
import { useParams, Outlet } from 'react-router-dom';
import DoctorSideNav from "./DoctorSideNav";
import DoctorTopNav from "./DoctorTopNav";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchDoctorInfo, sendOfficesData, sendServicesData } from "../store/doctorInfo-action";

export default function DoctorPage() {
  const dispatch = useDispatch();
  const fullName = useSelector(state => state.doctorInfo.name);
  const title = useSelector(state => state.doctorInfo.title);
  const state = useSelector(state => state.doctorInfo.state);
  const hospitalName = useSelector(state => state.doctorInfo.hospitalName);
  const offices = useSelector(state => state.doctorInfo.offices);
  const services = useSelector(state => state.doctorInfo.services);
  const params = useParams();
  const { id: doctorId } = params;

  useEffect(() => {
    dispatch(fetchDoctorInfo(params));
  }, [dispatch]);

  useEffect(() => {
    if (offices.changed) {
      dispatch(sendOfficesData(offices, doctorId));
    }
  }, [offices, dispatch]);

  useEffect(() => {
    if (services.changed) {
      dispatch(sendServicesData(services, doctorId));
    }
  }, [services, dispatch]);

  return (
    <div className="doctorPage">
      <DoctorSideNav id={doctorId} fullName={fullName} title={title} hospitalName={hospitalName} state={state} />
      <div className="doctorContent">
        <DoctorTopNav fullName={fullName}/>
        <Outlet />
      </div>
    </div>
  );
}
