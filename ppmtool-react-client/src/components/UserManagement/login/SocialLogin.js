import React, { Component } from "react";

import { GOOGLE_AUTH_URL } from "../../constants";
import googleLogo from "../../../img/google-logo.png";

class SocialLogin extends Component {
  render() {
    return (
      <div className="social-login">
        <a
          href={GOOGLE_AUTH_URL}
          title="Google"
          class="btn btn-block btn-social btn-lg btn-google-plus"
        >
          <i class="fa fa-google-plus" /> Sign in with Google
        </a>
      </div>
    );
  }
}

export default SocialLogin;
