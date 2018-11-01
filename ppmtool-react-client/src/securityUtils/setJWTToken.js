import axios from "axios";

//this set the header when using the api
const setJWTToken = token => {
  if (token) {
    console.log("insidetoken");

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    console.log("Bearer " + token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTToken;
