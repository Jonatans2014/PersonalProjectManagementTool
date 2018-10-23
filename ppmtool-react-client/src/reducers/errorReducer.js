/*Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
*/

//import GET_ERRORS from actions folder
import { GET_ERRORS } from "../actions/types";

const initialState = {};

//declare initialState and action on function
// use a switch to return each action payload.
export default function(state = initialState, action) {
	switch (action.type) {
		case GET_ERRORS:
			return action.payload;

		default:
			return state;
	}
}
