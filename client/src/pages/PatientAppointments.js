import "./PatientAppointments.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Row from "./PatientAppointmentTableRow";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addDays } from "date-fns";

import ApptModal from "../components/ApptModal";

export default function PatientProfile() {
  const [dropDown, setDropDown] = useState("All");
  const todayDate = new Date();

  const [range, setRange] = useState([
    {
      startDate: todayDate,
      endDate: addDays(todayDate, 7),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const params = useParams();
  const { id: patientId } = params;
  const appointments = useSelector(
    (state) => state.appointmentInfo.appointments
  );
  const patientAppointment = appointments.filter(
    (appointment) => parseInt(appointment.pid) === parseInt(patientId)
  );
  const [deleteMode, setDeleteMode] = useState(false);

  const [apptCreateModalOpen, setApptCreateModalOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("click", exitOut, true);
  }, []);

  function exitOut(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setOpen(false);
    }
  }

  const handleChange = (event) => {
    setDropDown(event.target.value);
  };

  return (
    <div className="patientAppointmentContainer">
      <div className="patientAppointmentHeader">
        <p>Date Range Select</p>
        <div className="patientAppointmentHeaderForm">
          <FormControl variant="standard" sx={{ m: 0, minWidth: 150 }}>
            <Select value={dropDown} onChange={handleChange}>
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Select Range"}>Select Range</MenuItem>
            </Select>
          </FormControl>
        </div>

        {dropDown === "Select Range" && (
          <div className="patientAppointmentSelectDate">
            <TextField
              value={`${
                range[0].startDate.getMonth() + 1
              }/${range[0].startDate.getDate()}/${range[0].startDate.getFullYear()} to ${
                range[0].endDate.getMonth() + 1
              }/${range[0].endDate.getDate()}/${range[0].endDate.getFullYear()}`}
              className="patientAppointmentSelectDateInput"
              variant="standard"
              readOnly
              onClick={() => setOpen((open) => !open)}
            />

            <div ref={wrapperRef}>
              {open && (
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                  className="patientAppointmentSelectDateInputCalendar"
                />
              )}
            </div>
          </div>
        )}
        <button id="patientAppointmentCreateButton" onClick={() => setApptCreateModalOpen(true)}>Create Appointment</button>
        <button
          className={
            deleteMode
              ? "patientAppointmentDeleteButtonOn"
              : "patientAppointmentDeleteButtonOff"
          }
          onClick={() => setDeleteMode((prevState) => !prevState)}
        >
          Delete Appointments
        </button>
      </div>
      <div id="createAppointmentModalContainer">
        {apptCreateModalOpen && <ApptModal setOpen={setApptCreateModalOpen} title="Create Appointment" ask1="blah" ask2="hey" pid={parseInt(patientId)} />}
      </div>
      <TableContainer className="patientAppointmentTable" component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Confirmed</TableCell>
              <TableCell align="center">Bill</TableCell>
              <TableCell align="center">Doctor</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Date Time</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {patientAppointment
              .filter((appointment) => {
                if (dropDown === "All") {
                  return true;
                }

                let dayAfterEnd = addDays(range[0].endDate, 1);

                if (
                  range[0].startDate <= appointment.dateTime &&
                  dayAfterEnd > appointment.dateTime
                ) {
                  return true;
                } else {
                  return false;
                }
              })
              .map((appointment) => (
                <Row
                  key={appointment.id}
                  row={appointment}
                  deleteMode={deleteMode}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
