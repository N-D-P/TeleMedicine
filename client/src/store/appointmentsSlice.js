import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const appointmentInitialState = {
  appointments: [],
  changed: false,
};

const appointmentsSlice = createSlice({
  name: "appointmentInfo",
  initialState: appointmentInitialState,
  reducers: {
    replaceAppointments(state, action) {
      state.appointments = action.payload;
    },
    addAppointment(state, action) {
      let appointment = {
        id: action.payload.id,
        dateTime: action.payload.dateTime,
        notes: action.payload.notes,
        isValid: false,
        pid: action.payload.pid,
        pidName: action.payload.pidName,
        did: action.payload.did,
        didName: action.payload.didName,
        url: action.payload.url,
        location: action.payload.location,
        service: action.payload.service,
        bill: {}
      };
      
      state.appointments.push(appointment);
      state.changed = true;
    },
    removeAppointments(state, action) {
      axios.post('http://localhost:5000/api/post/removeappointment', {id:action.payload})
      .then(res => console.log(res))
      .catch((err) => console.log(err))

      state.appointments = state.appointments.filter(appointment => appointment.id !== action.payload);
      state.changed = true;
    },
    verifyAppointment(state, action) {
      let appointmentToVerifyIndex = state.appointments.findIndex(appointment => appointment.id === action.payload);
      state.appointments[appointmentToVerifyIndex].isValid = true;
      state.changed = true;
    },
    alterAppointment(state, action) {
      let appointmentToAlterIndex = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
      state.appointments[appointmentToAlterIndex].dateTime = action.payload.dateTime;
      state.changed = true;
    },
    createBill(state, action) {
      let newBill = {
        id: action.payload.appointmentid,
        amount: action.payload.bill.amount, 
        isPaid: action.payload.bill.isPaid, 
        isVerified: action.payload.bill.isVerified,
        suser_id: action.payload.bill.suser_id
      }

      // let appointmentToCreateBillForIndex = state.appointments.findIndex(appointment => appointment.id === action.payload.appointmentId);
      // axios.post('http://localhost:5000/api/post/newbill', {id:action.payload.appointmentId,amount: action.payload.bill.amount,isPaid: action.payload.bill.isPaid, 
      // isVerified: action.payload.bill.isVerified,
      // suser_id: action.payload.bill.suser_id})
      // .then(res => console.log(res))
      // .catch((err) => console.log(err))

      let appointmentToCreateBillForIndex = state.appointments.findIndex(appointment => appointment.id === action.payload.appointmentId);
      axios.post('http://localhost:5000/api/post/newbill', {id:action.payload.appointmentId,amount: action.payload.bill.amount,isPaid: action.payload.bill.isPaid, 
      isVerified: action.payload.bill.isVerified,
      suser_id: action.payload.bill.suser_id})
      .then(res => console.log(res))
      .catch((err) => console.log(err))
      state.appointments[appointmentToCreateBillForIndex].bill = newBill;
      state.changed = true;
    },
    payBill(state, action) {
      let index = state.appointments.findIndex(appointment => appointment.id === action.payload);
      if(state.appointments[index].bill) {
        state.appointments[index].bill.isPaid = true;
      }
      state.changed = true;
    },
    editNote(state, action){
      let appointmentToEditNoteIndex = state.appointments.findIndex(appointment => appointment.id === action.payload.id);
      axios.post('http://localhost:5000/api/post/updatenote', {id:action.payload.id,notes:action.payload.notes})
      .then(res => console.log(res))
      .catch((err) => console.log(err))
      state.appointments[appointmentToEditNoteIndex].notes = action.payload.notes;
    }
  }
});

export const appointmentsActions = appointmentsSlice.actions;

export default appointmentsSlice.reducer;