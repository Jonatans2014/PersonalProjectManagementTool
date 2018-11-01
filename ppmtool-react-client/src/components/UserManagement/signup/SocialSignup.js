import React, { Component } from "react";
import fbLogo from "../../../img/fb-logo.png";
import googleLogo from "../../../img/google-logo.png";
import githubLogo from "../../../img/github-logo.png";
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  GITHUB_AUTH_URL
} from "../../constants";
class SocialSignup extends Component {
  render() {
    return (
      <div className="social-signup">
        <a
          href={GOOGLE_AUTH_URL}
          title="Google"
          class="btn btn-block btn-social btn-lg btn-google-plus"
        >
          <i class="fa fa-google-plus" /> Sign up with Google
        </a>
      </div>
    );
  }
}

export default SocialSignup;
