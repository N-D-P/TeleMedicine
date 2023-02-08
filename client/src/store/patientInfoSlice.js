import { createSlice } from "@reduxjs/toolkit";

const patientInitialState = {
  id: 0,
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  info: "",
  website: "",
  city: "",
  state: "",
  appointments: [],
  listOfDoctor: [],
};

const patientInfoSlice = createSlice({
  name: "patientInfo",
  initialState: patientInitialState,
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
    setCity(state, action){
      state.city = action.payload;
    },
    setListOfDoctors(state, action) {
      state.listOfDoctor = action.payload;
    }
  }
});

export const patientInfoActions = patientInfoSlice.actions;

export default patientInfoSlice.reducer;