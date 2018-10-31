import React, { Component } from "react";
import "./Signup.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import SocialSignup from "./SocialSignup";
import SignupForm from "./SignupForm";
import { Link } from "react-router-dom";
class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="signup-container">
        <div className="signup-content">
          <h1 className="signup-title">Signup to Project Management Tool</h1>

          <SocialSignup />
          <div className="or-separator">
            <span className="or-text">OR</span>
          </div>
          <SignupForm {...this.props} />
          <span className="login-link">
            Already have an account? <Link to="/login">Login!</Link>
          </span>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  security: state.security
});
export default connect(mapStateToProps)(Register);
