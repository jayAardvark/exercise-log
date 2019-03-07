import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <h1 className="mt-5">JogLog</h1>
        <p className="mt-1">choose an option below</p>
        <div className="welcome-btns">
          <Link className="btn btn-primary btn-block mb-4 p-3" to="/demo-login">
            demo w/out account
          </Link>
          <Link
            className="btn btn-primary btn-block mt-4 mb-4 p-3"
            to="/register"
          >
            create account
          </Link>
          <Link className="btn btn-primary btn-block mt-4 p-3" to="/login">
            login
          </Link>
          <Link className="btn btn-primary btn-block mt-4 p-3" to="/about">
            about
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
