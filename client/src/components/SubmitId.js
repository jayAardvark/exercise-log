import React, { Component } from "react";
import axios from "axios";

class SubmitId extends Component {
  render() {
    return (
      <form onSubmit={this.props.submitId}>
        {/* consider inputs for city and state for those inclined.  also, geolocation */}
        <input
          type="text"
          name="userId"
          placeholder="Enter your user ID number"
        />

        <button>Submit</button>
      </form>
    );
  }
}

export default SubmitId;
