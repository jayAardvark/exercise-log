import React, { Component } from "react";
//bring in link and use "Link" where normally an a-tag would go, and "to" where normally href would go!
import { Link } from "react-router-dom";
//bring in PropTypes and connect since we'll use Redux
import PropTypes from "prop-types";
import { connect } from "react-redux";
//bring in logout user action
import { logoutUser } from "../../actions/authActions";

export class NavbarButtons extends Component {
  onClickLogout(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    //we want to render the login and sign up links conditionally
    //the conditonals depend on isAuthenticated and user
    //there will be guest links and auth links rendered conditionally
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="mobile-buttons">
        {!isAuthenticated ? (
          <div className="">
            <Link className="btn btn-primary mob-btns m-1 p-4" to="/login">
              login
            </Link>

            <Link className="btn btn-primary mob-btns m-1 p-4" to="/register">
              sign-up
            </Link>
            <Link className="btn btn-primary mob-btns m-1 p-4" to="/about">
              about
            </Link>
          </div>
        ) : (
          <div className="">
            <Link className="btn btn-primary mob-btns m-1 p-4" to="/addLog">
              add log
            </Link>

            <Link className="btn btn-primary mob-btns m-1 p-4" to="/seeLogs">
              see logs
            </Link>

            <button
              className="btn btn-secondary mob-btns m-1 p-4"
              onClick={this.onClickLogout.bind(this)}
            >
              sign out
            </button>
          </div>
        )}
      </div>
    );
  }
}

//map props to PropTypes
//it's suggested that any props that you have in your
//component should be mapped to ComponentName.propTypes
//to ensure proper type is received
NavbarButtons.propTypes = {
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
)(NavbarButtons);
