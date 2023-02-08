import { patientInfoActions } from "./patientInfoSlice";

export function fetchPatientInfo(id) {
  return async (dispatch) => {
    //this is where you fetch patient info using the id
    function fetchPatientInfo() {
      //if there is an error, throw it

      let data;

      return data;
    }


    try {
      const patientInfoData = await fetchPatientInfo();

      //you may have to add more info to the database like the state the patient is located and their title

      //replace the hard coded fake data
      dispatch(patientInfoActions.setId(parseInt(id)));
      dispatch(patientInfoActions.setName("patient"));
      dispatch(patientInfoActions.setEmail("email"));
      //alter the string from the database to match format i.e. 8175559999 => (817)-555-9999
      dispatch(patientInfoActions.setPhoneNumber("(817)-555-9999"));
      //Address of primary office
      dispatch(patientInfoActions.setAddress("1234 Makebelieve Dr"));
      dispatch(
        patientInfoActions.setInfo(
          "info"
        )
      );
      dispatch(patientInfoActions.setWebsite("website"));
      dispatch(patientInfoActions.setState("Texas, US"));
      //setHospitalName will be the main office name
      dispatch(patientInfoActions.setCity("Richardson"));

      let docs = [
        {
          id: 0,
          name: "doc0",
          email: "email0",
          phoneNumber: "pno0",
          address: "address0",
          info: "info0",
          website: "website0",
          title: "title0",
          state: "state0",
          hospitalName: "hospital0",
          services: {
            list: ["service00", "service01"],
            changed: false
          },
          offices: {
            list: ["office00", "office01"],
            changed: false
          },
          reviews: [],
          appointments: [],
        },
        {
          id: 1,
          name: "doc1",
          email: "email1",
          phoneNumber: "pno1",
          address: "address1",
          info: "info1",
          website: "website1",
          title: "title1",
          state: "state1",
          hospitalName: "hospital1",
          services: {
            list: ["service10", "service11"],
            changed: false
          },
          offices: {
            list: ["office10", "office11"],
            changed: false
          },
          reviews: [],
          appointments: [],
        }
      ];

      dispatch(patientInfoActions.setListOfDoctors(docs));


    } catch (error) {
      console.log("Error fetching patients information");
    }
  };
}

export function sendAppointmentsData(appointments, id) {
  return async (dispatch) => {
    //everytime the list of offices changes this funciton is called
    //update the database dealing with the offices for this specific patient id here
    const sendRequest = async () => {
      //if an error occurs, throw it
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log("Error sending appointments");
    }
  };
}

