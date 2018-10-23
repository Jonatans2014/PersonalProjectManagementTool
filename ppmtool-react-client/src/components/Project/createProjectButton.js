import React from "react";
import { Link } from "react-router-dom";

//Functional Component
const createProjectButton = () => {
	//Wrappend in react.fragment and a link to crete a new project
	return (
		<React.Fragment>
			<Link to="/addProject" className="btn btn-lg btn-info">
				Create a Project
			</Link>
		</React.Fragment>
	);
};

export default createProjectButton;
