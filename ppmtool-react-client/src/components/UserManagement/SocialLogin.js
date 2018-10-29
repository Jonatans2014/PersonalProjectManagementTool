import React, { Component } from "react";

import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL,
  ACCESS_TOKEN
} from "../../constants";
//import { login } from "../../../util/APIUtils";
import { Link, Redirect } from "react-router-dom";
import fbLogo from "../../img/fb-logo.png";
import googleLogo from "../../img/google-logo.png";
import githubLogo from "../../img/github-logo.png";

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
          <img src={googleLogo} alt="Google" /> Log in with Google
        </a>
        <a
          className="btn btn-block social-btn facebook"
          href={FACEBOOK_AUTH_URL}
        >
          <img src={fbLogo} alt="Facebook" /> Log in with Facebook
        </a>
        <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
          <img src={githubLogo} alt="Github" /> Log in with Github
        </a>
      </div>
    );
  }
}

export default SocialLogin;
