import { createSlice } from "@reduxjs/toolkit";

const doctorInitialState = {
  id: 0,
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
};

const doctorInfoSlice = createSlice({
  name: "doctorInfo",
  initialState: doctorInitialState,
  reducers: {
    setId(state, action) {
      state.id = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setInfo(state, action) {
      state.info = action.payload;
    },
    setWebsite(state, action) {
      state.website = action.payload;
    },
    setTitle(state, action){
      state.title = action.payload;
    },
    setState(state, action){
      state.state = action.payload;
    },
    setHospitalName(state, action){
      state.hospitalName = action.payload;
    },
    setServices(state, action){
      state.services.list = action.payload;
    },
    addService(state, action) {
      state.services.list.push(action.payload);
      state.services.changed = true;
    },
    removeService(state, action) {
      state.services.list = state.services.list.filter(service => service.name != action.payload);
      state.services.changed = true;
    },
    setOffices(state, action){
      state.offices.list = action.payload;
    },
    addOffice(state, action) {
      state.offices.list.push(action.payload);
      state.offices.changed = true;
    },
    removeOffice(state, action) {
      state.offices.list = state.offices.list.filter(office => office.id != action.payload);
      state.offices.changed = true;
    },
    setReviews(state, action){
      state.reviews = action.payload;
    }
  }
});

export const doctorInfoActions = doctorInfoSlice.actions;

export default doctorInfoSlice.reducer;