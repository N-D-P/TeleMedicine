import { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Modal.css";
import { createPortal } from "react-dom";
import { doctorInfoActions } from "../store/doctorInfoSlice";
import { appointmentsActions } from "../store/appointmentsSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fetchDoctorInfo } from "../store/doctorInfo-action";

import { TextField, Checkbox, FormGroup, FormControlLabel, FormControl, Select, InputLabel, MenuItem } from '@mui/material';

/*
props.ask1
props.ask2
props.list
props.title

*/
export default function ApptModal(props) {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.doctorInfo.services);
  const offices = useSelector((state) => state.doctorInfo.offices);
  const doctorInfo = useSelector((state) => state.doctorInfo);
  const patientInfo = useSelector((state) => state.patientInfo);
  const [list, setList] = useState([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const modalRef = useRef(null);
  const [addListName, setAddListName] = useState("");
  const [addListDetail, setAddListDetail] = useState("");
  const [doctor, setDoctor] = useState({
    id: -1,
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  info: "",
  website: "",
  title: "",
  state: "",
  hospitalName: "",
  services: {
    list: [],
    changed: false},
  offices: {
    list: [],
    changed: false},
  reviews: [],
  appointments: [],
  });
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [service, setService] = useState("");
  const [online, setOnline] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [doctorSelected, setDoctorSelected] = useState(false);

  useEffect(() => {
    if (props.title === "Services") {
      let tmpList = [];
      services.list.forEach((service) => {
        tmpList.push({
          name: service.name,
          description: service.description,
        });
      });
      setList(tmpList);
    } else {
      let tmpList = [];
      offices.list.forEach((office) => {
        tmpList.push({
          name: office.name,
          description: office.address,
          id: office.id,
        });
      });
      setList(tmpList);
    }
  }, [services, offices]);

  // useEffect(() => {
  //   document.addEventListener("click", exitOutModal, true);
  // }, []);

  //somehow the select dropdown is not contained within the modal, so clicking the select will close the modal
  //maybe the dropdown menu is not considered part of the modal

  function exitOutModal(event) {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      props.setOpen(false);
    }
  }

  function removeElement(element) {
    if (deleteMode) {
      if (props.title === "Services") {
        dispatch(doctorInfoActions.removeService(element.name));
      } else {
        dispatch(doctorInfoActions.removeOffice(element.id));
      }
    }
  }

  function addElement(element) {
    //fetchDoctorInfo(parseInt(did));
    //how to get info about a doctor? per id -- i.e. update doctorInfo whenever did changes
    //alert(doctorInfo.name);

    //patientInfo.listOfDoctor
    //search
    let newId = Math.floor(Math.random() * 1000) + 100;
    let appt = {
      id: newId,
      dateTime: date,
      notes: "",
      isValid: false,
      pid: patientInfo.id, //nan -- issue with parsing?
      pidName: patientInfo.name,
      did: doctor.id,
      didName: doctor.name, //fetch by id
      url: online ? location : null, //how to generate url
      location: online ? null : location,   //null if none
      service: service,
      bill: null
    };
    dispatch(appointmentsActions.addAppointment(appt));
    //close modal?
  }

  return (
    <Fragment>
      {createPortal(
        <div className="modalBackground">
          <div ref={modalRef} className="modalContainer">
            <button
              className="modalCloseButton"
              onClick={() => props.setOpen(false)}
            >
              &times;
            </button>
            <div className="modalTitle">
              <h1>{props.title}</h1>
            </div>
            <div className="modalBody">
              {/*{list.map((element) => (
                <div
                  className={
                    deleteMode
                      ? "modalBodyListContainer listHover"
                      : "modalBodyListContainer"
                  }
                  onClick={() => {
                    removeElement(element);
                  }}
                >
                  <div className="modalBodyListTitleContainer">
                    <p className="modalBodyListContainerName">{element.name}</p>
                  </div>
                  <p className="modalBodyListContainerDetail">
                    {element.description}
                  </p>
                </div>
                ))}*/}
              <div className="modalBodyListContainer">
                <div className="bodyListNameInputContainer">
                  {/*<TextField
                    className="bodyListNameInput"
                    size="small"
                    label="DoctorID"
                    variant="outlined"
                    value={doctor}
                    onChange={(event) => setDoctor(event.target.value)}
                  />*/}
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Doctor</InputLabel>
                    <Select
                      value={doctorSelected ? doctor : ""}
                      onChange={(event) => {
                        setDoctor(event.target.value);
                        setDoctorSelected(true);
                      }}
                      label="Doctor"
                    >

                      {patientInfo.listOfDoctor.map((doc) => (
                        <MenuItem value={doc}>{doc.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="Date"
                      value={date}
                      onChange={setDate}
                      renderInput={(params) => (
                        <TextField
                          style={{ width: "200px" }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="standard"
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                  {/*<TextField
                    className="bodyListNameInput"
                    size="small"
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    disabled={online}
                        />*/}
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Location</InputLabel>
                    <Select
                      value={online ? "online" : location}
                      onChange={(event) => setLocation(event.target.value)}
                      label="Location"
                      disabled={!doctorSelected || online}
                    >
                      {online ? <MenuItem value="online">Online</MenuItem> : <div></div>}
                      {doctor.offices.list.map((office) => (
                        <MenuItem value={office}>{office}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormGroup>
                    <FormControlLabel control={
                      <Checkbox
                        onChange={() => { setOnline(!online) }}
                      />} label="Online" />
                  </FormGroup>
                  {/*<TextField
                    className="bodyListNameInput"
                    size="small"
                    label="Service"
                    variant="outlined"
                    value={service}
                    onChange={(event) => setService(event.target.value)}
                  />*/}
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel>Service</InputLabel>
                    <Select
                      value={service}
                      onChange={(event) => setService(event.target.value)}
                      label="Service"
                      disabled={!doctorSelected}
                    >
                      {doctor.services.list.map((service) => (
                        <MenuItem value={service}>{service}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
            <div className="modalButtonContainer">
              <div className="modalFooter">
                {/*<button
                  onClick={() => setDeleteMode((prev) => !prev)}
                  className={
                    deleteMode
                      ? "deleteButton deleteButtonActive"
                      : "deleteButton"
                  }
                >
                  Delete
                </button>*/}
                <button onClick={addElement} className="addButton">
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.getElementById("modal-root")
      )}
    </Fragment>
  );
}
