import React, { Component } from "react";
import axios from "axios";

class SeeAllLogs extends Component {
  onSubmit(e) {
    e.preventDefault();

    let userId = e.target.userId.value;

    console.log(userId);

    axios
      .get(`/api/exercise/all-logs?userId=${userId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h3>See All Logs</h3>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="userId" placeholder="userId" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default SeeAllLogs;
