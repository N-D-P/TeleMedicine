import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, Fragment } from "react";
import CheckIcon from "@mui/icons-material/Check";
import "./PatientAppointmentTableRow.css";
import { format } from "date-fns";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import {  useDispatch } from "react-redux";
import { appointmentsActions } from "../store/appointmentsSlice";


export default function Row(props) {
  const dispatch = useDispatch();
  const { row, deleteMode } = props;
  const [open, setOpen] = useState(false);
  const [appointmentTime, setAppointmentTime] = useState(dayjs(row.dateTime));

  const [billCost, setBillCost] = useState(row.bill ? row.bill.amount : "");
  const [appointmentNotes, setAppointmentNotes] = useState(row.notes);

  function payBill(event) {
    event.preventDefault();
    dispatch(
      appointmentsActions.alterAppointment({
        id: row.id,
        dateTime: appointmentTime.toDate(),
      })
    );
    dispatch(appointmentsActions.payBill(row.id));
  }

  function deleteAppointment() {
    if (deleteMode) {
      dispatch(appointmentsActions.removeAppointments(row.id));
    }
  }


  return (
    <Fragment>
      <TableRow
        onClick={deleteAppointment}
        className={deleteMode ? "patientTableRow" : ""}
      >
        <TableCell align="left">
          {row.isValid ? <CheckIcon className="checkedIcon" /> : ""}
        </TableCell>
        <TableCell align="center"> {/* somehow an empty bill is being created which then shows "$undefined" for bill.amount, so added additional check for bill.amount to be defined */}
          {row.bill && row.bill.amount ? ( 
            row.bill.isPaid && row.bill.isVerified ? (
              <CheckIcon className="checkedIcon" />
            ) : (
              "$" + row.bill.amount
            )
          ) : (
            ""
          )}
        </TableCell>
        <TableCell align="center">{row.didName}</TableCell>
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
              <div className="patientAppointmentExpanderTop">
                <div className="patientAppointmentExpanderVerify">
                  
                      {/* !!!!!!!!!!!!!!! only show verified and paid if the bill exists */}
                      {/* don't need edit appointment}*/}
                      {row.bill && row.bill.amount ? <div>
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
                    </div> : <div></div>
                    }
                    {/*<button
                      className="patientAppointmentExpanderVerifyButton patientAppointmentExpanderBillButton"
                      type="submit"
                    >
                      Submit
                    </button>
                    </form>*/}
                </div>
                {!row.location ? (
                  <div className="patientAppointmentExpanderLocation">
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
                  <div className="patientAppointmentExpanderLocation"></div>
                )}
              </div>
              <div className="patientAppointmentServiceContainer">
                <p className="patientAppointmentServiceContainerTitle">Service: </p>
                <p className="patientAppointmentServiceContainerDetail">{row.service}</p>
              </div>
              <div className="patientAppointmentExpanderBottom">
                <p className="patientAppointmentExpanderBottomTitle">Notes</p>
                <div className="appointmentNoteContainer">{appointmentNotes}</div>
                {row.bill && row.bill.amount ? 
                <button id="buttonPayBill" onClick={payBill}>Pay Bill</button> :
                <div></div> }
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}
