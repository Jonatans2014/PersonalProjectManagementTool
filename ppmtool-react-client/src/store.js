import { createStore, applyMiddleware, compose } from "redux";
/*
Redux Thunk is a middleware that lets you call action creators that return a function instead of an action object. That function receives the store's dispatch method, which is then used to dispatch regular synchronous actions inside the body of the function once the asynchronous operations have completed*/
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//Declare initial state(Data) and middleware
const initalState = {};
const middleware = [thunk];

//declare a variable store
let store;

//This is done to work with many browsers
if (window.navigator.userAgent.includes("Chrome")) {
	//create store when it indentifies chrome browser
	//add rootReducer and initialState and apply middleWare
	store = createStore(
		rootReducer,
		initalState,
		compose(
			//... is es6 javascript add multiple middleware
			applyMiddleware(...middleware),
			//only chrome can take this redux devtool extention, it will be null if used in other browsers.
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
} else {
	store = createStore(
		rootReducer,
		initalState,
		compose(applyMiddleware(...middleware))
	);
}

//Export store
export default store;
