import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function DoctorTopNav(props) {
  const fullName = useSelector(state => state.doctorInfo.name);
  const location = useLocation();
  const [page, setPage] = useState("");

  useEffect(() => {
    if (location.pathname.substring(10) != "profile") {
      setPage("Appointments");
    } else {
      setPage("Profile")
    }
  }, [location.pathname.substring(10)])
  

  return (
    <nav className="doctorTopBar">
      <div className="doctorProfileTitle">
        <h1>{page}</h1>
      </div>
      <div class="searchBar">
        <input type="text" className="searchBarInput" placeholder="Search" />
        <button type="submit" className="searchBarButton">
          <SearchIcon style={{ color: "white" }} />
        </button>
      </div>
      <div className="doctorTopBarRight">
        <NotificationsIcon />
        <img src={require("../asset/femalDoctor.jpg")} alt="profile"/>
      </div>
    </nav>
  );
}
