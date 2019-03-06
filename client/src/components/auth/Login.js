import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    //call action
    this.props.loginUser(user);

    console.log(user);
  };
  render() {
    const { errors } = this.state;
    return (
      <div>
        <h1 className="mt-3">Log In</h1>
        <form onSubmit={this.onSubmit} className="login-fields">
          <div className="form-style">
            <input
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.onChange}
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email
              })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
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
          <button className="btn btn-primary btn-block mt-4">Submit</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

//to access auth's State within this component, use mapStateToProps.  "state.auth" is defined in "/reducers/index" or our "root reducer"
//the code below allows us to access the contents of "state.auth" (etc) via the syntax this.props.auth (etc)
//the errors (etc) below were mapped from Redux the state
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
