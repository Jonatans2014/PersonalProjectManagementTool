import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";

import { fetchUser } from "../../../actions/Oauth2Action";
class Profile extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillReceiveProps(nextProps) {
    fetchUser(this.props.history);
    this.props.fetchUser(this.props.history);
  }

  render() {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              <h1>state.prop</h1>
              /> ) : (
              <div className="text-avatar">
                <span>
                  <h2>fdfd</h2>
                </span>
              </div>
              )}
            </div>
            <div className="profile-name">
              <h2>fdfdfd</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(Profile);
