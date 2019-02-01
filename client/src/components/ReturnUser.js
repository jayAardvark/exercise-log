import React, { Component } from "react";
import { Link } from "react-router-dom";

class ReturnUser extends Component {
  render() {
    return (
      <div>
        <p>Welcome back! What would you like to do?</p>
        <Link to="/api/exercise/add"> Add to your log</Link>
        <Link to="/api/exercise/all-logs"> See your log</Link>
        <Link to="/api/exercise/filter-log"> See your log between 2 dates</Link>
      </div>
    );
  }
}

export default ReturnUser;
