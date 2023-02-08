import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, Fragment, useRef, useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./DoctorAppointmentTableRow.css";
import { format } from "date-fns";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useSelector, useDispatch } from "react-redux";
import { appointmentsActions } from "../store/appointmentsSlice";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";

export default function Row(props) {
  const dispatch = useDispatch();
  const { row, deleteMode } = props;
  const [open, setOpen] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState(dayjs(row.dateTime));

  const [billCost, setBillCost] = useState(row.bill ? row.bill.amount : "");
  const [appointmentNotes, setAppointmentNotes] = useState(row.notes);

  function handleChange(time) {
    setAppointmentTime(time);
  }

  function validatAppointment(event) {
    event.preventDefault();
    dispatch(
      appointmentsActions.alterAppointment({
        id: row.id,
        dateTime: appointmentTime.toDate(),
      })
    );
    dispatch(appointmentsActions.verifyAppointment(row.id));
  }

  function createBill(event) {
    event.preventDefault();
    let bill = {
      amount: billCost,
      isPaid: false,
      isVerified: false,
      suser_id: 211111
    };
    dispatch(
      appointmentsActions.createBill({
        bill,
        appointmentId: row.id,

      })
    );
  }

  function deleteAppointment() {
    console.log("Inside deleteAppointment");
    if (deleteMode) {
      dispatch(appointmentsActions.removeAppointments(row.id));
    }
  }

  function updateNote(event) {
    event.preventDefault();
    dispatch(appointmentsActions.editNote({id: row.id, notes: appointmentNotes}))
  }

  return (
    <Fragment>
      <TableRow
        onClick={deleteAppointment}
        className={deleteMode ? "doctorTableRow" : ""}
      >
        <TableCell align="left">
          {row.isValid ? <CheckIcon className="checkedIcon" /> : ""}
        </TableCell>
        <TableCell align="center">
          {row.bill ? (
            row.bill.isPaid && row.bill.isVerified ? (
              <CheckIcon className="checkedIcon" />
            ) : (
              "$" + row.bill.amount
            )
          ) : (
            ""
          )}
        </TableCell>
        <TableCell align="center">{row.pidName}</TableCell>
        <TableCell align="center">
          {row.location ? row.location : "Online"}
        </TableCell>
        <TableCell align="center">
          {format(row.dateTime, "MM/dd/yyyy hh:mm aaaa")}
        </TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <div className="doctorAppointmentExpanderTop">
                <div className="doctorAppointmentExpanderVerify">
                  <form
                    onSubmit={validatAppointment}
                    className="doctorAppointmentExpanderVerifyForm"
                  >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        label="Validate Appointment"
                        value={appointmentTime}
                        onChange={handleChange}
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
                    <button
                      className="doctorAppointmentExpanderVerifyButton"
                      type="submit"
                    >
                      Validate
                    </button>
                  </form>
                </div>
                <div className="doctorAppointmentExpanderBill">
                  <p className="doctorAppointmentExpanderBillTitle">Set Bail</p>
                  <form
                    className="doctorAppointmentExpanderBillForm"
                    onSubmit={createBill}
                  >
                    <FormControl variant="standard">
                      <InputLabel htmlFor="standard-adornment-amount">
                        Amount
                      </InputLabel>
                      <Input
                        type="number"
                        style={{ width: "100px" }}
                        value={billCost}
                        onChange={(event) => setBillCost(event.target.value)}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                      />
                    </FormControl>
                    <TextField
                      style={{ width: "50px" }}
                      disabled
                      label="Verified"
                      readOnly
                      value={
                        row.bill
                          ? row.bill.isVerified
                            ? "true"
                            : "false"
                          : "false"
                      }
                      variant="standard"
                    />
                    <TextField
                      style={{ width: "50px" }}
                      disabled
                      label="Paid"
                      readOnly
                      value={
                        row.bill
                          ? row.bill.isPaid
                            ? "true"
                            : "false"
                          : "false"
                      }
                      variant="standard"
                    />
                    <button
                      className="doctorAppointmentExpanderVerifyButton doctorAppointmentExpanderBillButton"
                      type="submit"
                    >
                      Submit
                    </button>
                  </form>
                </div>
                {!row.location ? (
                  <div className="doctorAppointmentExpanderLocation">
                    <p className="doctionAppointmentLocationExpanderTitle">
                      URL:{" "}
                    </p>
                    <a
                      href="https://google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="doctionAppointmentLocationExpanderDetail"
                    >
                      {row.url}
                    </a>
                  </div>
                ) : (
                  <div className="doctorAppointmentExpanderLocation"></div>
                )}
              </div>
              <div className="doctorAppointmentServiceContainer">
                <p className="doctorAppointmentServiceContainerTitle">Service: </p>
                <p className="doctorAppointmentServiceContainerDetail">{row.service}</p>
              </div>
              <div className="doctorAppointmentExpanderBottom">
                <p className="doctorAppointmentExpanderBottomTitle">Notes</p>
                <form className="doctorAppointmentExpanderBottomTitleForm" onSubmit={updateNote}>
                  <div className="appointmentNoteContainer">
                    <TextField
                      style={{ width: "100%", backgroundColor: "#EAF3FA" }}
                      multiline
                      rows={3}
                      value={appointmentNotes}
                      variant="standard"
                      onChange={(event) =>
                        setAppointmentNotes(event.target.value)
                      }
                    />
                  </div>
                  <div className="appointmentNoteButtonContainer">
                    <button type="submit" className="appointmentNoteButton">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
