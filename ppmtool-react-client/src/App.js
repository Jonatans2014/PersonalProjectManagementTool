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
import Register from "./components/UserManagement/SignUp/Register";
import Login from "./components/UserManagement/Login/Login";
import OAuth2RedirectHandler from "./components/UserManagement/oauth2/OAuth2RedirectHandler";
import { ACCESS_TOKEN } from "./components/constants/index";
//The provider is used to define the store to allow us to wire react with redux
import { Provider } from "react-redux";
//import store
import store from "./store";
import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityAction";
import SecuredRoute from "./securityUtils/SecureRoute";

import { getCurrentUser } from "../src/util/APIUtils";
import { connect } from "react-redux";
import { fetchUser } from "../src/actions/Oauth2Action";
import Alert from "react-s-alert";

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

    fetchUser();
    this.setState({
      authenticated: true,
      loading: false
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

    /*
    
            <Route
              path="/profile"
              authenticated={this.state.authenticated}
              currentUser={this.state.currentUser}
              component={Profile}
            />*/

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            {
              //Public Routes
              //check out sign render after
            }

            <Route exact path="/" component={Landing} />
            <Route path="/signup" render={props => <Register {...props} />} />
            <Route exact path="/login" component={Login} />

            <Route path="/profile" component={Dashboard} />
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler} />

            {
              //Private Routes
            }
            <Switch>
              <SecuredRoute exact path="/dashboard" component={Dashboard} />
              <SecuredRoute exact path="/addProject" component={AddProject} />
              <SecuredRoute
                exact
                path="/updateProject/:id"
                component={UpdateProject}
              />

              <SecuredRoute
                exact
                path="/projectBoard/:id"
                component={ProjectBoard}
              />
              <SecuredRoute
                exact
                path="/addProjectTask/:id"
                component={AddProjectTask}
              />
              <SecuredRoute
                exact
                path="/updateProjectTask/:backlog_id/:pt_id"
                component={UpdateProjectTask}
              />
            </Switch>

            <Alert
              stack={{ limit: 3 }}
              timeout={3000}
              position="top-right"
              effect="slide"
              offset={65}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
