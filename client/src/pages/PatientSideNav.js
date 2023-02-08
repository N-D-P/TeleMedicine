import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import "./PatientSideNav.css";
import "./Patient.css";
import { NavLink } from "react-router-dom";

export default function PatientSideNav(props) {
  return (
    <nav className="patientSideBar">
      <img
        className="patientInverseLogo"
        src={require("../asset/telemedicine-inverse-logo-crop.png")}
        alt="logo"
      />
      <img
        className="patientPic patientImage"
        alt="profile"
        src={require("../asset/patient.jpg")}
      />
      <p className="patientName">{props.fullName}</p>
      <p className="patientState">
        <LocationOnIcon />
        {props.city + ", " + props.state}
      </p>
      <ul className="patientSidebarMenu">
        <li>
          <NavLink
            to={"/patient/" + props.id + "/profile"}
            className={(navData) =>
              navData.isActive ? "active navListItem" : "navListItem"
            }
          >
            {" "}
            <AccountBoxIcon className="patientSideBarIcon" /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/patient/" + props.id + "/appointments"}
            className={(navData) =>
              navData.isActive ? "active navListItem" : "navListItem"
            }
          >
            {" "}
            <CalendarTodayIcon className="patientSideBarIcon" /> Appointments
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={(navData) =>
              navData.isActive ? "active navListItem" : "navListItem"
            }
          >
            {" "}
            <LogoutIcon className="patientSideBarIcon" /> Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
