import React, { Component } from "react";
import axios from "axios";

class FilterLog extends Component {
  onSubmit(e) {
    e.preventDefault();

    let userId = e.target.userId.value;
    let username = e.target.username.value;
    let from = e.target.from.value;
    let to = e.target.to.value;

    console.log(userId);

    axios
      .get(`/api/exercise/filter-log?userId=${userId}&from=${from}&to=${to}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>Filter Log</h3>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="userId" placeholder="userId" />
          <input type="text" name="username" placeholder="username" />
          <input type="text" name="from" placeholder="from" />
          <input type="text" name="to" placeholder="to" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default FilterLog;
