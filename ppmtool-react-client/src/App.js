import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";

//The provider is used to define the store to allow us to wire react with redux
import { Provider } from "react-redux";
//import store
import store from "./store";

class App extends Component {
  render() {
    //wrap the entire our entire application with the Provider Tag and declare the store
    //add components with theirs URL.
    //when clicked on addproject, it goes to the add project component
    // and add a new proejct
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <Route
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              component={UpdateProjectTask}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
