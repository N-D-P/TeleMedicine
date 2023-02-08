import "./PatientProfile.css";
import "./Patient.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function PatientProfile() {
  const fullName = useSelector((state) => state.patientInfo.name);
  const info = useSelector((state) => state.patientInfo.info);
  const title = useSelector((state) => state.patientInfo.title);
  const phoneNumber = useSelector((state) => state.patientInfo.phoneNumber);
  const email = useSelector((state) => state.patientInfo.email);
  const address = useSelector((state) => state.patientInfo.address);
  const website = useSelector((state) => state.patientInfo.website);

  return (
    <div className="patientProfileGrid">
      <div className="patientProfileCard patientInfoCard">
        <img
          className="patientProfile patientImage"
          alt="profile"
          src={require("../asset/patient.jpg")}
        />
        <div className="patientProfileContent">
          <h1 className="patientProfileContentH1">{fullName}</h1>
          <p className="patientProfileContentP">{title}</p>
          <div className="patientSpecific">
            <div className="patientProfileSpecific patientInfoGrid">
              <p className="patientProfileSpecificTitle">Info</p>
              <p className="patientProfileSpecificContent">{info}</p>
            </div>
            <div className="patientProfileSpecific patientContactGrid">
              <p className="patientProfileSpecificTitle">Contact</p>
              <p className="patientProfileSpecificContent">{phoneNumber}</p>
              <p className="patientProfileSpecificContent">{email}</p>
            </div>
            <div className="patientProfileSpecific patientAddressGrid">
              <p className="patientProfileSpecificTitle">Address</p>
              <p className="patientProfileSpecificContent">{address}</p>
            </div>
            <div className="patientProfileSpecific patientWebsiteGrid">
              <p className="patientProfileSpecificTitle">Website</p>
              <p className="patientProfileSpecificContent">{website}</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
