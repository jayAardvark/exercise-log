import React, { Component } from "react";
//bring in link and use "Link" where normally an a-tag would go, and "to" where normally href would go!
import { Link } from "react-router-dom";
//bring in PropTypes and connect since we'll use Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
//bring in logout user action
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onClickLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    //we want to render the login and sign up links conditionally
    //the conditonals depend on isAuthenticated and user
    //there will be guest links and auth links rendered conditionally
    const { isAuthenticated, user } = this.props.auth;

    const linksPreAuthenticated = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Signup
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    const linksAfterAuthenticated = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/AddLog">
            Add Log
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/SeeLogs">
            See Logs
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="#"
            onClick={this.onClickLogout.bind(this)}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-success mb-4">
        <div className="container">
          {isAuthenticated ? (
            <Link className="navbar-brand" to="/addLog">
              JogLog
            </Link>
          ) : (
            <Link className="navbar-brand" to="/">
              JogLog
            </Link>
          )}
          {/* <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button> */}

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {" "}
                  about
                </Link>
              </li>
            </ul>
            {isAuthenticated ? linksAfterAuthenticated : linksPreAuthenticated}
          </div>
        </div>
      </nav>
    );
  }
}

//map props to PropTypes
//it's suggested that any props that you have in your
//component should be mapped to ComponentName.propTypes
//to ensure proper type is received
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//to access auth's State within this component, use mapStateToProps.  "state.auth" is defined in "/reducers/index" or our "root reducer"
//the code below allows us to access the contents of "state.auth" (etc) via the syntax this.props.auth (etc)
//the errors (etc) below were mapped from Redux the state
const mapStateToProps = state => ({
  auth: state.auth
});

//note that we don't merely export the component but also connect
//because we're using redux. the 2nd parameter  in connect
//is an object in which we map our actions.
//this component (Navbar) is passed into withRouter
//to allow for re-direction from within our authActions action
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
