import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LogoutIcon from "@mui/icons-material/Logout";
import "./DoctorSideNav.css";
import { NavLink } from "react-router-dom";

export default function DoctorSideNav(props) {
  return (
    <nav className="doctorSideBar">
      <img
        className="doctorInverseLogo"
        src={require("../asset/telemedicine-inverse-logo-crop.png")}
        alt="logo"
      />
      <img
        className="doctorPic"
        alt="profile"
        src={require("../asset/femalDoctor.jpg")}
      />
      <p className="doctorName">{props.fullName}</p>
      <p className="doctorTitle">{props.title}</p>
      <p className="doctorHospital">@{props.hospitalName}</p>
      <p className="doctorState">
        <LocationOnIcon />
        {props.state}
      </p>
      <ul className="doctorSidebarMenu">
        <li>
          <NavLink
            to={"/doctor/" + props.id + "/profile"}
            className={(navData) =>
              navData.isActive ? "active navListItem" : "navListItem"
            }
          >
            {" "}
            <AccountBoxIcon className="doctorSideBarIcon" /> Profile
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/doctor/" + props.id + "/appointments"}
            className={(navData) =>
              navData.isActive ? "active navListItem" : "navListItem"
            }
          >
            {" "}
            <CalendarTodayIcon className="doctorSideBarIcon" /> Appointments
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
            <LogoutIcon className="doctorSideBarIcon" /> Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
