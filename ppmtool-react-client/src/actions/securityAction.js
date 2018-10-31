import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    var myObj = new Object(),
      str = "myString",
      rand = Math.random(),
      obj = new Object();
    console.log(LoginRequest);

    // post => Login Request
    // const res = await axios.post(API_BASE_URL + "/auth/login", LoginRequest);
    //fetch userData and setToken to header using setJWTTOKEN
    const res = await axios.post(API_BASE_URL + "/auth/login", LoginRequest);

    console.log("this in res");

    console.log(res.data);

    // extract token from res.data
    const { accessToken } = res.data;
    console.log("works");
    console.log(accessToken);
    // store the token in the localStorage
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    const accesToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accesToken) {
      console.log("nah");
    } else {
      console.log("yeeeey");
    }

    // set our token in header ***
    //setJWTToken(token);
    // decode token on React
    //const decoded = jwt_decode(accessToken);

    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: "decoded"
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: myObj
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
