import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./Patient.css";
import "./PatientTopNav.css";

export default function PatientTopNav(props) {
  const location = useLocation();
  const [page, setPage] = useState("");

  useEffect(() => {
    const regex = new RegExp("/patient/.*/");
    if (location.pathname.replace(regex, "") != "profile") {
      setPage("Appointments");

    } else {
      setPage("Profile")
    }
  }, [location.pathname.substring(10)])
  

  return (
    <nav className="patientTopBar">
      <div className="patientProfileTitle">
        <h1>{page}</h1>
      </div>
      <div className="searchBar">
        <input type="text" className="searchBarInput" placeholder="Search" />
        <button type="submit" className="searchBarButton">
          <SearchIcon style={{ color: "white" }} />
        </button>
      </div>
      <div className="patientTopBarRight">
        <NotificationsIcon />
        <img className="patientImage" src={require("../asset/patient.jpg")} alt="profile"/>
      </div>
    </nav>
  );
}
