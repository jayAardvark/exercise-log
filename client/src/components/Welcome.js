import React, { Component } from "react";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <p>
          Welcome to JogLog, a place where you can keep track of your commitment
          to jogging!
        </p>
        <p>
          If you are a new user, click
          <Link to="/api/exercise/new-user"> here</Link>
        </p>
        <p>
          If you know your user ID number, click
          <Link to="/return-user"> here</Link>
        </p>
      </div>
    );
  }
}

export default Welcome;
