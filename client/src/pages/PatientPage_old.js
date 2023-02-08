
//import 'bootstrap/dist/css/bootstrap.css';
import "./PatientPage.css";

import "./DoctorPage.css";
import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';


let sidebarActive = document.getElementById("sidebar-profile"); //this needs to be set after the element is created, so after the return...

const dummyAppointment = {
  "doctor": "doctor1",
  "date": "date1",
  "location": "location1",
  "service": "service1",
  "bill": "bill1"
} //paid, apptVerified, billVerified
const dummyA2 = {
  "doctor": "doctor2",
  "date": "date2",
  "location": "location2",
  "service": "service2",
  "bill": "bill2"
}
const dummyAppointments = [dummyAppointment, dummyA2];

const dummyD1 = {
  "id": 1,
  "name": "doctor1",
  "locations": [1, 2], //lid
  "services": ["s1", "s2"]
}
const dummyDoctors = [dummyD1];



/////////////////////////////
export default function PatientPage() {
  const [fullName, setFullName] = useState("Helena Hall");
  const [title, setTitle] = useState("Podiatrist");
  const [hospitalName, setHospitalName] = useState("Vibra Hospital");
  const [state, setState] = useState("Texas, US");

  const [heading, setHeading] = useState("Patient");
  //const [content, setContent] = useState("content goes here");

  //const [sidebarActive, setSidebarActive] = useState(document.getElementById("sidebarProfile"));




  //const [ActiveContent, setActiveContent] = useState("profile");
  const [activeContent, setActiveContent] = useState("profile");
  const [activeAppointment, setActiveAppointment] = useState(dummyAppointment);

  return (
    <div className="doctorPage">
      <nav className="doctorSideBar">
        <img
          className="doctorInverseLogo"
          src={require("../asset/telemedicine-inverse-logo-crop.png")}
        />
        <img className="doctorPic" src={require("../asset/femalDoctor.jpg")} />
        <p className="doctorName">{fullName}</p>
        <p className="doctorTitle">{title}</p>
        <p className="doctorHospital">@{hospitalName}</p>
        <p className="doctorState">
          <LocationOnIcon />
          {state}
        </p>
        <ul className="doctorSidebarMenu" onClick={sidebarOnClick}>
          <li id="sidebar-profile" className="active sidebarItem">
            {" "}
            <AccountBoxIcon className="doctorSideBarIcon" /> Profile
          </li>
          <li id="sidebar-appointments" className="sidebarItem">
            {" "}
            <CalendarTodayIcon className="doctorSideBarIcon" /> Appointments
          </li>
          <li id="sidebar-doctors" className="sidebarItem">
            {" "}
            <CalendarTodayIcon className="doctorSideBarIcon" /> Browse Doctors
          </li>
          <li id="sidebar-logout" className="sidebarItem">
            {" "}
            <LogoutIcon className="doctorSideBarIcon" /> Logout
          </li>
        </ul>
      </nav>
      <div className="doctorContent" id="content">
        <nav className="doctorTopBar">
          <div className="doctorProfileTitle">
            <h1>{heading}</h1>
          </div>
          <div className="searchBar">
            <input
              type="text"
              className="searchBarInput"
              placeholder="Search"
            />
            <button type="submit" className="searchBarButton">
              <SearchIcon style={{ color: "white" }} />
            </button>
          </div>
          <div className="doctorTopBarRight">
            <NotificationsIcon />
            <img src={require("../asset/femalDoctor.jpg")} />
          </div>
        </nav>
        <ContentSection />
      </div>
    </div>
  );




  function changeSidebarTab(t) {

    if (sidebarActive == null) { //temporary fix until find a way to set automatically after element is created
      sidebarActive = document.getElementById("sidebar-profile");
    }
    sidebarActive.classList.remove("active");
    sidebarActive = document.getElementById(t);
    setActiveContent(t.replace("sidebar-", ""));
    sidebarActive.classList.add("active");
  }

  function sidebarOnClick(e) {
    if (e.target) {
      if (e.target.nodeName == "LI") {
        changeSidebarTab(e.target.id);
      }
    }
  }



  function ContentSection() {

    let contents =
      [
        ["profile", <ContentPatientProfile />],
        ["appointments", <ContentPatientAppointments />],
        ["appointment-view", <ContentPatientAppointmentView />],
        ["appointment-create", <ContentPatientAppointmentCreate />],
        ["appointment-bill", <ContentPatientBill />],
        ["doctors", <ContentPatientDoctors />],
        ["logout", <ContentPatientLogout />]
      ]

    let c;
    contents.forEach((pair) => {
      if (activeContent === pair[0]) {

        c = pair[1];
        return;
      }
    });
    return c;

  }

  function ContentPatientProfile() {
    //database read
    return (
      <div>
        <h1>Patient: Profile</h1>
        <div>
          <p>Name</p>
          <p>Stuff</p>
        </div>
      </div>
    );
  }

  function ContentPatientAppointments() {
    const [appointments, setAppointments] = useState(dummyAppointments); //database read

    return (
      <div className="container">
        <div className="row">
          <h1>Patient: Appointments</h1>
          <div>
            <button onClick={() => { setActiveContent("appointment-create"); }}>Create Appointment</button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Location</th>
                <th>Service</th>
                <th>Bill</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                appointments.map((a) => <tr key={[a.doctor, a.date]}><td>{a.doctor}</td><td>{a.date}</td><td>{a.location}</td><td>{a.service}</td><td>{a.bill}</td><td><button onClick={() => { setActiveAppointment(a); setActiveContent("appointment-view"); }}>View</button></td></tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function ContentPatientAppointmentView() {
    return (
      <div className="container">
        <div className="row">
          <h1>Patient: View Appointment</h1>
          <div>
            <button onClick={() => { setActiveContent("appointment-bill"); }}>Pay Bill</button>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Date</th>
                <th>Location</th>
                <th>Service</th>
                <th>Bill</th>
              </tr>
            </thead>
            <tbody>
              <tr>

                <td>{activeAppointment.doctor}</td>
                <td>{activeAppointment.date}</td>
                <td>{activeAppointment.location}</td>
                <td>{activeAppointment.service}</td>
                <td>{activeAppointment.bill}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <button onClick={() => { setActiveContent("appointments"); }}>Back</button>

      </div>
    );
  }

  function ContentPatientAppointmentCreate() {

    return (
      <div>
        <h1>Patient: Create Appointment</h1>

        <div class="container">
          <form>
            {/*<div class="row">
              <label>pid</label>
              <input type="number" id="pid" name="pid" />
            </div>*/}
            <div class="row">
              <label>DoctorID</label>
              <input type="number" id="did" name="did" />
            </div>
            <div class="row">
              <label>LocationID</label>
              <input type="number" id="lid" name="lid" />
            </div>
            <div class="row">
              <label>Date</label>
              <input type="datetime-local" id="date" name="date" />
            </div>
            <div class="row">
              <label>Service</label>
              <input type="text" id="service" name="service" />
            </div>
            <div>
              <button onClick={() => {/* database write */ setActiveContent("appointments"); }}>Submit</button>
              <button onClick={() => { setActiveContent("appointments"); }}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function ContentPatientBill() {

    return (
      <div>
        <h1>Patient: Pay Bill</h1>
        Bill Amount: {activeAppointment.bill}
        <div>
          <button onClick={() => { setActiveContent("appointment-view") }}>Pay</button> {/* database write */}
          <button onClick={() => { setActiveContent("appointment-view") }}>Cancel</button>
        </div>

      </div>
    );
  }

  function ContentPatientDoctors() {
    const [doctors, setDoctors] = useState(dummyDoctors); //database read

    return (
      <div>
        <h1>Patient: Browse Doctors</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Locations</th>
              <th>Services</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              doctors.map((d) => <tr key={d.id}><td>{d.id}</td><td>{d.name}</td><td>{d.locations}</td><td>{d.services}</td><td><button onClick={() => { alert("view doctor") }}>View</button></td></tr>)
            } {/* need better format for listing locations and services */}
          </tbody>
        </table>
      </div>
    )
  }

  function ContentPatientLogout() {

    return (
      <div>
        <h1>Patient: Logout</h1>
        <div>
          <button>Yes</button>
          <button>No</button>
        </div>
      </div>
    );
  }




}

