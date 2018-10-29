import axios from "axios";
import { GET_OAUTH2_USERS } from "./types";
import { ACCESS_TOKEN, API_BASE_URL } from "../constants";
export const fetchUser = history => async dispatch => {
  try {
    const res = await axios.get(API_BASE_URL + "/user/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}` }
    });

    console.log("this in res");

    console.log(res);

    dispatch({
      type: GET_OAUTH2_USERS,
      payload: res
    });
  } catch (err) {
    dispatch({
      type: GET_OAUTH2_USERS,
      payload: "err.response.data"
    });
  }
};
