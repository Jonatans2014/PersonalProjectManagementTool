import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchUser } from "../../../actions/Oauth2Action";
class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount(nextProps) {
    this.props.fetchUser();
  }

  render() {
    const { validToken, user } = this.props.security;
    console.log(user);
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              <h1>Welcome</h1>
              <div className="text-avatar">
                {validToken ? (
                  <img src={user.imageUrl} alt={user.name} />
                ) : (
                  <div className="text-avatar">
                    <span>{user.name && user.name[0]}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="profile-name">
              <h2>{user.name}</h2>
              <p className="profile-email">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  security: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  security: state.security
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(Profile);
