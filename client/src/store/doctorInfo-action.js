import { doctorInfoActions } from "./doctorInfoSlice";
import axios from "axios";
export function fetchDoctorInfo(id) {
  return async (dispatch) => {
    //this is where you fetch doctor info using the id
    function fetchDoctorInfo() {
      //if there is an error, throw it

      let data;

      return data;
    }

    //this is where you fetch doctor's reviews using the id
    function fetchDoctorReviews() {
      //if there is an error, throw it

      let data;

      return data;
    }

    //this is where you fetch doctor's offices using the id
    function fetchDoctorOffices() {
      //if there is an error, throw it

      let data;

      return data;
    }

    //this is where you fetch doctor's services using the id
    async function fetchDoctorServices() {
      // //if there is an error, throw it
      // var service1=[];
      // console.log("services: ", service1);
      // await axios.get('http://localhost:5000/api/get/doctorservices')
      // .then(res =>  service1 = res.data)
      // .catch((err) => console.log(err) )
      // // console.log(appointmentData);
      // // let data;
      // return service1;
    }

    try {
      const doctorInfoData = await fetchDoctorInfo();
      const doctorReviewsData = await fetchDoctorReviews();
      const doctorOfficesData = await fetchDoctorOffices();
      const docotorServicesData = await fetchDoctorServices();

      //you may have to add more info to the database like the state the doctor is located and their title

      //replace the hard coded fake data
      dispatch(doctorInfoActions.setId(parseInt(id)));
      dispatch(doctorInfoActions.setName("Helena Hall"));
      dispatch(doctorInfoActions.setEmail("helenahall@vibrahospital.org"));
      //alter the string from the database to match format i.e. 8175559999 => (817)-555-9999
      dispatch(doctorInfoActions.setPhoneNumber("(817)-555-9999"));
      //Address of primary office
      dispatch(doctorInfoActions.setAddress("1234 Makebelieve Dr"));
      dispatch(
        doctorInfoActions.setInfo(
          "A medical professional devoted to the treatment of disorders of the foot, ankle, and related structures of the leg."
        )
      );
      dispatch(doctorInfoActions.setWebsite("www.HelenHallPodiatrist.com"));
      dispatch(doctorInfoActions.setTitle("Podiatrist"));
      dispatch(doctorInfoActions.setState("Texas, US"));
      //setHospitalName will be the main office name
      dispatch(doctorInfoActions.setHospitalName("Vibra Hospital"));

      //set the list of reviews in the method setReviews, follow the format given in tmpReview
      //use pid to retrieve the customer name that gave the review
      let tmpReveiw = [
        {
          dateTime: new Date('December 1, 2020 08:30:00'),
          comment: "Best foot doctor ever!!",
          rating: 5,
          customerName: "Bob",
        },
        {
          dateTime: new Date('December 2, 2020 08:30:00'),
          comment: "Okish foot doctor ever!!",
          rating: 3,
          customerName: "Lisy",
        },
      ]
      dispatch(doctorInfoActions.setReviews(tmpReveiw))

      //set the list of offices in the method setOffices, follow the format given in tmpOffices
      let tmpOffices = [
        {
          id: 1,
          address: "1234 Address1 Rd, Richardson, TX 75080",
          name: "Vibra Hospital",
        },
        {
          id: 2,
          address: "1234 Address2 Rd, Richardson, TX 75080",
          name: "Blue Hospital",
        },
      ]
      dispatch(doctorInfoActions.setOffices(tmpOffices))

      //set the list of services in the method setServices, follow the format given in tmpServices
      let tmpServices = [
        {
          name: "Foot Surgery",
          description: "The replacement of the foot"
        },
        {
          name: "Toe Extraction",
          description: "The removal of a toe"
        },
      ]
      dispatch(doctorInfoActions.setServices(tmpServices))


    } catch (error) {
      console.log("Error fetching doctors information");
    }
  };
}

export function sendOfficesData(offices, id) {
  return async (dispatch) => {
    //everytime the list of offices changes this funciton is called
    //update the database dealing with the offices for this specific doctor id here
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

export function sendServicesData(services,id) {
  return async (dispatch) => {
    //everytime the list of services changes this funciton is called
    //update the database dealing with the services for this specific doctor id here
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