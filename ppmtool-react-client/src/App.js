import React, { Component } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/login/Login";
import OAuth2RedirectHandler from "./components/UserManagement/oauth2/OAuth2RedirectHandler";
import { ACCESS_TOKEN } from "./components/constants/index";
import { getCurrentUser } from "./util/APIUtils";
import Alert from "react-s-alert";
import Profile from "./components/UserManagement/profile/Profile";
import NotFound from "../src/common/NotFound";
import AppHeader from "../src/common/AppHeader";
import Signup from "../src/components/UserManagement/signup/Signup";
//The provider is used to define the store to allow us to wire react with redux
import { Provider } from "react-redux";
//import store
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityAction";
import SecuredRoute from "./securityUtils/SecureRoute";
import PrivateRoute from "./common/PrivateRoute";

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/";
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false
    };

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    this.setState({
      loading: true
    });

    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

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
            {
              //Public Routes
            }

            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {
              //Private Routes
            }
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/addProject" component={AddProject} />
              <Route
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />

              <Route
                path="/oauth2/redirect"
                component={OAuth2RedirectHandler}
              />

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
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
