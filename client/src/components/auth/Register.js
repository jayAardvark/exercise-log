import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import classnames from "classnames";
//use connect to connect Redux to this component
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
//we need to be able to redirect from within an action. bring in withRouter
//look at very last line of code in this file
import { withRouter } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  //redirect logged in user
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/addLog");
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      //if there is an errors prop, set that to state of this component
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/addLog"); //redirect if user is logged in
    }
  };

  onChange = e => {
    //when the user types into field, we want to update the state
    //of this component to reflect that
    //because there are multiple props in state, we'll use
    //syntax that, in essence, automatically detects which state we update
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    //the argument "this.props.history" allows the ability to re-direct from within
    //the registerUser action since we can't use this.props.history
    //as we can within the component
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div className="register-component">
        {user ? user.name : null}
        <h1 className="mt-3">Sign Up</h1>
        <form onSubmit={this.onSubmit} className="register-fields">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.onChange}
            className={classnames("form-control form-control-lg", {
              "is-invalid": errors.username
            })}
          />
          {errors.username && (
            <div className="invalid-feedback">{errors.username}</div>
          )}
          <input
            type="text"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.onChange}
            className={classnames("form-control form-control-lg mt-4", {
              "is-invalid": errors.email
            })}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
          <input
            type="text"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.onChange}
            className={classnames("form-control form-control-lg mt-4", {
              "is-invalid": errors.password
            })}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
          <input
            type="text"
            name="password2"
            placeholder="confirm password"
            value={this.state.password2}
            onChange={this.onChange}
            className={classnames("form-control form-control-lg mt-4", {
              "is-invalid": errors.password2
            })}
          />
          {errors.password2 && (
            <div className="invalid-feedback">{errors.password2}</div>
          )}
          <button className="btn btn-primary btn-block mt-4">Submit</button>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//to access auth's State within this component, use mapStateToProps.  "state.auth" is defined in "/reducers/index" or our "root reducer"
//the code below allows us to access the contents of "state.auth" (etc) via the syntax this.props.auth (etc)
//the errors (etc) below were mapped from Redux state
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

//note that we don't merely export the component but also connect
//because we're using redux. the 2nd parameter  in connect
//is an object in which we map our actions.
//this component (Register) is passed into withRouter
//to allow for re-direction from within our authActions action
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
