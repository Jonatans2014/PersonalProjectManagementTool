import React, { Component } from "react";
import ProjectItem from "./Project/ProjectItem";
import CreateProjectButton from "./Project/createProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectAction";
import PropTypes from "prop-types";
import { fetchUser } from "../actions/Oauth2Action";
//call CreateProjectButton (functional component)
//call ProjectITEM
class Dashboard extends Component {
  //lifeCycle hook
  //it is called immediattely after the component is rendered
  //create each project
  //extract data from props
  // map trough projects and pass the data to projectItem component

  componentDidMount() {
    this.props.getProjects();
    //this.props.fetchUser();
  }
  render() {
    const { projects } = this.props.project;
    const { validToken, user } = this.props.security;

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />

              <br />
              <hr />

              {projects.map(project => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//setup propTypes

Dashboard.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};
//mapstate to props
const mapStateToProps = state => ({
  project: state.project,
  security: state.security
});
//connect our component to our redux store
export default connect(
  mapStateToProps,
  { getProjects, fetchUser }
)(Dashboard);
