//import axios for async and GET_ERRORS type from type.js

import axios from "axios";
import { GET_ERRORS } from "./types";

//async: the function will return a promise
// await: the function will wait until there's some data returned.

/*The dispatch method is a method of the store object. An action is dispatched to trigger an update to the store.
*/
export const createProject = (project, history) => async dispatch => {
	try {
		//make an async request to the spring api
		//use html5 history.push to send back to dashboard
		const res = await axios.post("http://localhost:8080/api/project", project);
		history.push("/dashboard");
	} catch (err) {
		//if error, then dispatch error msgs
		dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		});
	}
};
