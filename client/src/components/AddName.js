import React, { Component } from "react";
import axios from "axios";

class Add extends Component {
  onSubmit(e) {
    e.preventDefault();

    //submits for username
    let username = e.target.username.value;
    console.log(username);

    axios
      .post("/api/exercise/new-user", { username: username })
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <h2>Enter a username to get started.</h2>
        <p>
          for demonstration purposes, you may also use the following user ID:
          insert Id
        </p>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="username" placeholder="username" />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Add;
