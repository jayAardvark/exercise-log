import React, { Component } from "react";
import axios from "axios";

class AddJogLog extends Component {
  onSubmit(e) {
    e.preventDefault();

    let userId = e.target.userId.value;
    let username = e.target.username.value;
    let duration = e.target.duration.value;
    let date = e.target.date.value;

    console.log(username);

    axios
      .post("/api/exercise/add", {
        userId: userId,
        username: username,
        duration: duration,
        date: date
      })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>jog log</h3>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="userId" placeholder="userId" />
          <input type="text" name="username" placeholder="username" />
          <input type="text" name="duration" placeholder="duration of jog" />
          <input type="text" name="date" placeholder="yyyy-mm-dd" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddJogLog;
