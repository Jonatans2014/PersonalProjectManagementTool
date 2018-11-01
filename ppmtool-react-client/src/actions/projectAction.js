//import axios for async and GET_ERRORS type from type.js

import axios from "axios";
import { GET_ERRORS, GET_PROJECTS, GET_PROJECT, DELETE_PROJECT } from "./types";
import { ACCESS_TOKEN } from "../constants";
import setJWTToken from "../securityUtils/setJWTToken";
//async: the function will return a promise
// await: the function will wait until there's some data returned.

/*The dispatch method is a method of the store object. An action is dispatched to trigger an update to the store.
*/
export const createProject = (project, history) => async dispatch => {
  try {
    //make an async request to the spring api
    //use html5 history.push to send back to dashboard
    await axios.post("/api/project", project);
    history.push("/dashboard");
    //if ok, then dispatch nothing as a error
    //assign null to error when data is sent to the API
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    //if error, then dispatch error msgs
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//make async request to get all the projects from the api
export const getProjects = () => async dispatch => {
  const accesToken = localStorage.getItem(ACCESS_TOKEN);

  console.log("heyhey");
  console.log(accesToken);

  const res = await axios.get("/api/project/all", setJWTToken(accesToken));
  dispatch({
    type: GET_PROJECTS,
    payload: res.data
  });
};
//make async request to get a Single  project from the api
export const getProject = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/project/${id}`);
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (error) {
    history.push("/dashboard");
  }
};

//Async to delete project from API
//Filter the project that has the project identifier from our action payload
export const deleteProject = id => async dispatch => {
  if (
    window.confirm(
      "Are you sure? This will delete the project and all the data related to it"
    )
  ) {
    await axios.delete(`/api/project/${id}`);
    dispatch({
      type: DELETE_PROJECT,
      payload: id
    });
  }
};
