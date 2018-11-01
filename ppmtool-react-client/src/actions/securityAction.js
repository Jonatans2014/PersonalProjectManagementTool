import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
import Alert from "react-s-alert";

export const createNewUser = (newUser, history) => async dispatch => {
  try {
    await axios.post("/auth/signup", newUser);

    Alert.success("You're successfully registered. Please login to continue!");
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    Alert.err(
      (err && err.message) || "Oops! Something went wrong. Please try again!"
    );

    dispatch({
      type: GET_ERRORS,
      payload: "err.response.data"
    });
  }
};

export const login = LoginRequest => async dispatch => {
  try {
    console.log(LoginRequest);

    //fetch userToken
    const res = await axios.post("/auth/login", LoginRequest);

    console.log("this in res");

    console.log(res.data);

    // extract token from res.data
    const { accessToken } = res.data;

    // store the token in the localStorage
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    const accesToken = localStorage.getItem(ACCESS_TOKEN);

    const decoded = jwt_decode(accessToken);
    console.log(decoded);
    // dispatch to our securityReducer

    Alert.success("You're successfully logged in!");
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (err) {
    /*
    Alert.error(
      (err && err.message) || "Oops! Something went wrong. Please try again!"
    );*/
    dispatch({
      type: GET_ERRORS,
      payload: " "
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem(ACCESS_TOKEN);
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
