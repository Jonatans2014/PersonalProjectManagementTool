import React, { Component } from "react";

/*. PropTypes defines type and which props are required. This benefits the future you and other developer using your component in two ways:

1. You can easily open up a component and check which props are required and what type they should be.
2. When things get messed up React will give you an awesome error message in the console, saying which props is wrong/missing plus the render method that caused the problem.
https://developer.fortnox.se/blog/proptypes-in-react-js/
*/

import PropTypes from "prop-types";

/* using Connect*,
we can now connect our components to it. We established previously that there is no way to directly interact with the store. We can either retrieve data by obtaining its current state, or change its state by dispatching an action (we only have access to the top and bottom component of the redux flow diagram shown previously).

*/
import { connect } from "react-redux";
import { createProject } from "../../actions/projectAction";

/*
A simple JavaScript utility for conditionally joining classNames together.
Usage with React.js
This package is the official replacement for classSet, which was originally shipped in the React.js Addons bundle.

One of its primary use cases is to make dynamic and conditional className props simpler to work with (especially more so than conditional string manipulation). So where you may have the following code to generate a className prop for a <button> in React:
*/
import classnames from "classnames";
class AddProject extends Component {
	//Declare our initial state.
	constructor() {
		super();

		this.state = {
			projectName: "",
			projectIdentifier: "",
			description: "",
			start_date: "",
			end_date: "",
			errors: {}
		};

		//bind onchange and submit to the form
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	/*Mounting methods
	Updating methods
	Components do not always remain in the same state after mounting. Sometimes the underlying props could change and the component has to be re-rendered. The updating lifecycle methods give you control over when and how this updating should take place.

	There are five updating lifecycle methods and they are called in the order they appear below:

	componentWillReceiveProps
	shouldComponentUpdate
	componentWillUpdate
	render
	componentDidUpdate
		https://blog.pusher.com/beginners-guide-react-component-lifecycle/
*/

	//Called when component maybe receiving new props
	//life cycle hooks
	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}

	compo;

	//when any states change then set new state.
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	onSubmit(e) {
		e.preventDefault();
		const newProject = {
			projectName: this.state.projectName,
			projectIdentifier: this.state.projectIdentifier,
			description: this.state.description,
			start_date: this.state.start_date,
			end_date: this.state.end_date
		};

		//When we looked at the react dev tool
		//jsut because we rendered this component with the router
		//then it passes this props.history directly onto the component, which we can extract
		this.props.createProject(newProject, this.props.history);
	}

	render() {
		//assigning the state error by using destructuring
		const { errors } = this.state;
		return (
			<div>
				{
					//check name attribute input fields
					//create constructor
					//set state
					//set value on input fields
					//create onChange function
					//set onChange on each input field
					//bind on constructor
					//check state change in the react extension#
					//classnames is used to set up some conditionals
					//on our input field which is going to enables
					// that dynamic display of errors that we just looked at
				}

				<div className="project">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h5 className="display-4 text-center">Create Project form</h5>
								<hr />
								<form onSubmit={this.onSubmit}>
									<div className="form-group">
										<input
											type="text"
											className={classnames("form-control form-control-lg", {
												"is-invalid": errors.projectName
											})}
											placeholder="Project Name"
											name="projectName"
											value={this.state.projectName}
											onChange={this.onChange}
										/>
										{errors.projectName && (
											<div className="invalid-feedback">
												{errors.projectName}
											</div>
										)}
									</div>
									<div className="form-group">
										<input
											type="text"
											className={classnames("form-control form-control-lg", {
												"is-invalid": errors.projectIdentifier
											})}
											placeholder="Unique Project ID"
											name="projectIdentifier"
											value={this.state.projectIdentifier}
											onChange={this.onChange}
										/>
										{errors.projectIdentifier && (
											<div className="invalid-feedback">
												{errors.projectIdentifier}
											</div>
										)}
									</div>
									<div className="form-group">
										<textarea
											className={classnames("form-control form-control-lg", {
												"is-invalid": errors.description
											})}
											placeholder="Project Description"
											name="description"
											value={this.state.description}
											onChange={this.onChange}
										/>
										{errors.description && (
											<div className="invalid-feedback">
												{errors.description}
											</div>
										)}
									</div>
									<h6>Start Date</h6>
									<div className="form-group">
										<input
											type="date"
											className="form-control form-control-lg"
											name="start_date"
											value={this.state.start_date}
											onChange={this.onChange}
										/>
									</div>
									<h6>Estimated End Date</h6>
									<div className="form-group">
										<input
											type="date"
											className="form-control form-control-lg"
											name="end_date"
											value={this.state.end_date}
											onChange={this.onChange}
										/>
									</div>
									<input
										type="submit"
										className="btn btn-primary btn-block mt-4"
									/>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
//Connect Component to the state.
//the arg in connect, maps our state to our props.
//Also pass the create project action
//Then SETUP the props type.
//prop types are like a constraint
// you are telling react that create project function
//is a required	type for this component to work properly
AddProject.propTypes = {
	// createProject is a functional component
	createProject: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

//map state.errors to our component props
const mapStateToProps = state => ({
	errors: state.errors
});

export default connect(
	mapStateToProps,
	{ createProject }
)(AddProject);
