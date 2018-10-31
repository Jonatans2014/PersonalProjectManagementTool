import axios from "axios";
import { GET_OAUTH2_USERS } from "./types";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
import setJWTToken from "../securityUtils/setJWTToken";
export const fetchUser = () => async dispatch => {
  try {
    const accesToken = localStorage.getItem(ACCESS_TOKEN);

    console.log(accesToken);
    
    //fetch userData and setToken to header using setJWTTOKEN
    const res = await axios.get(
      API_BASE_URL + "/user/me",
      setJWTToken(accesToken)
    );

    console.log("this in res");

    console.log(res);

    dispatch({
      type: GET_OAUTH2_USERS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_OAUTH2_USERS,
      payload: "err.response.data"
    });
  }
};
